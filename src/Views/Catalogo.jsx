import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { db } from "../Database/FirebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import EdicionProducto from "../Components/Productos/EdicionProducto";
import ProductosPorNegocio from "../Components/Catalogo/ProductosPorNegocio";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [negocioSeleccionado, setNegocioSeleccionado] = useState("Todos");
  const [showEditModal, setShowEditModal] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const productosCollection = collection(db, "Producto");
  const categoriasCollection = collection(db, "Categoria");
  const negociosCollection = collection(db, "Negocio");

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setIsOffline(!navigator.onLine);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const fetchData = async () => {
    try {
      const [productosData, categoriasData, negociosData] = await Promise.all([
        getDocs(productosCollection),
        getDocs(categoriasCollection),
        getDocs(negociosCollection),
      ]);

      const fetchedProductos = productosData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const fetchedCategorias = categoriasData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const fetchedNegocios = negociosData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProductos(fetchedProductos);
      setCategorias(fetchedCategorias);
      setNegocios(fetchedNegocios);
      if (isOffline) console.log("Offline: datos cargados desde caché local.");
    } catch (error) {
      console.error("Error al obtener datos:", error);
      if (isOffline) {
        alert("Estás sin conexión. Mostrando datos desde caché local si están disponibles.");
      } else {
        alert("Error al obtener datos: " + error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [isOffline]);

  const openEditModal = (producto) => {
    setProductoEditado({ ...producto });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductoEditado((prev) => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProducto = async () => {
    if (!productoEditado) return;
    const productoRef = doc(db, "Producto", productoEditado.id);
    try {
      setProductos((prev) =>
        prev.map((prod) =>
          prod.id === productoEditado.id ? { ...productoEditado } : prod
        )
      );
      if (isOffline) {
        alert("Producto actualizado localmente. Se sincronizará al reconectar.");
        console.log("Modo offline: Producto editado localmente.");
      } else {
        await updateDoc(productoRef, {
          nombre: productoEditado.nombre,
          precio: productoEditado.precio,
          categoria: productoEditado.categoria,
          imagen: productoEditado.imagen,
        });
        console.log("Producto actualizado en la nube.");
      }
      setShowEditModal(false);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      if (!isOffline) alert("Error al actualizar producto: " + error.message);
    }
  };

  const productosFiltrados = productos.filter((producto) => {
    const matchesCategoria =
      categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada;
    const matchesNegocio =
      negocioSeleccionado === "Todos" || producto.id_negocio === negocioSeleccionado;
    return matchesCategoria && matchesNegocio;
  });

  return (
    <Container className="mt-5">
      <br />
      <h4>Catálogo de Productos {isOffline && <span style={{ color: "red" }}>(Modo sin conexión)</span>}</h4>
      <Row>
        {/* Filtro por negocio */}
        <Col lg={3} md={3} sm={6}>
          <Form.Group className="mb-3">
            <Form.Label>Filtrar por negocio:</Form.Label>
            <Form.Select
              value={negocioSeleccionado}
              onChange={(e) => setNegocioSeleccionado(e.target.value)}
            >
              <option value="Todos">Todos</option>
              {negocios.map((negocio) => (
                <option key={negocio.id} value={negocio.id}>
                  {negocio.nombre_negocio}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {productosFiltrados.length > 0 ? (
          <ProductosPorNegocio
            productos={productosFiltrados}
            openEditModal={openEditModal}
            negocios={negocios}
          />
        ) : (
          <p>No hay productos en este negocio.</p>
        )}
      </Row>

      <EdicionProducto
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        productoEditado={productoEditado}
        handleEditInputChange={handleEditInputChange}
        handleEditImageChange={handleEditImageChange}
        handleEditProducto={handleEditProducto}
        categorias={categorias}
      />
    </Container>
  );
};

export default Catalogo;
