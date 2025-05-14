import React, { useState, useEffect } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { db, auth } from "../Database/FirebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import TablaNegocios from "../Components/Negocios/TablaNegocios";
import RegistroNegocio from "../Components/Negocios/RegistroNegocio";
import EdicionNegocio from "../Components/Negocios/EdicionNegocio";
import EliminacionNegocio from "../Components/Negocios/EliminacionNegocio";
import CuadroBusquedas from "../Components/Busqueda/CuadroBusquedas";
import Paginacion from "../Components/Ordenamiento/Paginacion";

const Negocios = () => {
  const [negocios, setNegocios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [emprendedores, setEmprendedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevoNegocio, setNuevoNegocio] = useState({
    id_emprendedor: "",
    nombre_negocio: "",
    descripcion: "",
    categoria: "",
    ubicacion: "",
    logo: "",
  });
  const [negocioEditado, setNegocioEditado] = useState(null);
  const [negocioAEliminar, setNegocioAEliminar] = useState(null);
  const [negociosFiltrados, setNegociosFiltrados] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const itemsPerPage = 5;
  const negociosCollection = collection(db, "Negocio");
  const categoriasCollection = collection(db, "Categoria");
  const emprendedoresCollection = collection(db, "Emprendedor");

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

  useEffect(() => {
    const unsubscribeNegocios = onSnapshot(negociosCollection, async (snapshot) => {
      const fetchedNegocios = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const emprendedoresData = await Promise.all(
        fetchedNegocios.map(async (negocio) => {
          const emp = emprendedores.find(e => e.id === negocio.id_emprendedor);
          return { ...negocio, nombres: emp ? emp.nombres : "Desconocido" };
        })
      );
      setNegocios(emprendedoresData);
      setNegociosFiltrados(emprendedoresData);
    });

    const unsubscribeCategorias = onSnapshot(categoriasCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCategorias(data);
    });

    const unsubscribeEmprendedores = onSnapshot(emprendedoresCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setEmprendedores(data);
    });

    return () => {
      unsubscribeNegocios();
      unsubscribeCategorias();
      unsubscribeEmprendedores();
    };
  }, [emprendedores]);

  useEffect(() => {
    if (auth.currentUser) {
      setNuevoNegocio((prev) => ({
        ...prev,
        id_emprendedor: auth.currentUser.uid,
      }));
    }
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtrados = negocios.filter((n) =>
      n.nombre_negocio.toLowerCase().includes(text) ||
      n.categoria.toLowerCase().includes(text) ||
      n.ubicacion.toLowerCase().includes(text)
    );
    setNegociosFiltrados(filtrados);
  };

  const handleInputChange = (e) => {
  const { name, value } = e.target;
    let filteredValue = value;

    if (["nombre_negocio", "descripcion", "categoria"].includes(name)) {
      filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0\s]/g, "");
    } else if (name === "ubicacion") {
      filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/g, ""); // letras y números
    }

    setNuevoNegocio((prev) => ({ ...prev, [name]: filteredValue }));
  };


  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;

    if (["nombre_negocio", "descripcion", "categoria"].includes(name)) {
      filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0\s]/g, "");
    } else if (name === "ubicacion") {
      filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/g, ""); // letras y números
    }

    setNegocioEditado((prev) => ({ ...prev, [name]: filteredValue }));
  };


  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNuevoNegocio((prev) => ({ ...prev, logo: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleEditLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNegocioEditado((prev) => ({ ...prev, logo: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleAddNegocio = async () => {
    const { nombre_negocio, descripcion, categoria, ubicacion, logo } = nuevoNegocio;
    if (!nombre_negocio || !descripcion || !categoria || !ubicacion || !logo) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    setShowModal(false);
    const tempId = `temp_${Date.now()}`;
    const negocioConId = { ...nuevoNegocio, id: tempId };
    setNegocios((prev) => [...prev, negocioConId]);
    setNegociosFiltrados((prev) => [...prev, negocioConId]);
    try {
      await addDoc(negociosCollection, nuevoNegocio);
      setNuevoNegocio({
        id_emprendedor: auth.currentUser?.uid || "",
        nombre_negocio: "",
        descripcion: "",
        categoria: "",
        ubicacion: "",
        logo: "",
      });
    } catch (error) {
      console.error("Error al agregar negocio:", error);
      if (!isOffline) alert("Error al agregar negocio: " + error.message);
    }
  };

  const handleEditNegocio = async () => {
    const { nombre_negocio, descripcion, categoria, ubicacion, logo } = negocioEditado;
    if (!nombre_negocio || !descripcion || !categoria || !ubicacion || !logo) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    setShowEditModal(false);
    try {
      const ref = doc(db, "Negocio", negocioEditado.id);
      await updateDoc(ref, negocioEditado);
    } catch (error) {
      console.error("Error al actualizar negocio:", error);
      if (!isOffline) alert("Error al actualizar negocio: " + error.message);
    }
  };

  const handleDeleteNegocio = async () => {
    if (!negocioAEliminar) return;
    setShowDeleteModal(false);
    try {
      const ref = doc(db, "Negocio", negocioAEliminar.id);
      await deleteDoc(ref);
    } catch (error) {
      console.error("Error al eliminar negocio:", error);
      if (!isOffline) alert("Error al eliminar negocio: " + error.message);
    }
  };

  const openEditModal = (negocio) => {
    setNegocioEditado({ ...negocio });
    setShowEditModal(true);
  };

  const openDeleteModal = (negocio) => {
    setNegocioAEliminar(negocio);
    setShowDeleteModal(true);
  };

  const paginatedNegocios = negociosFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Negocios {isOffline && "(Modo sin conexión)"}</h4>
      <Row>
        <Col lg={2}>
          <Button onClick={() => setShowModal(true)} className="mb-3" style={{ width: "100%" }}>
            <i className="bi bi-plus-circle me-2" />
            Agregar
          </Button>
        </Col>
        <Col lg={3}>
          <CuadroBusquedas searchText={searchText} handleSearchChange={handleSearchChange} />
        </Col>
      </Row>
      <TablaNegocios
        negocios={paginatedNegocios}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        totalItems={negocios.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={negociosFiltrados.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <RegistroNegocio
        showModal={showModal}
        setShowModal={setShowModal}
        nuevoNegocio={nuevoNegocio}
        handleInputChange={handleInputChange}
        handleAddNegocio={handleAddNegocio}
        handleLogoChange={handleLogoChange}
        categorias={categorias}
      />
      <EdicionNegocio
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        negocioEditado={negocioEditado}
        handleEditInputChange={handleEditInputChange}
        handleEditNegocio={handleEditNegocio}
        handleEditLogoChange={handleEditLogoChange}
        categorias={categorias}
      />
      <EliminacionNegocio
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteNegocio={handleDeleteNegocio}
      />
    </Container>
  );
};

export default Negocios;
