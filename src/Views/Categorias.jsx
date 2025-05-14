import React, { useState, useEffect } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { db } from "../Database/FirebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import TablaCategorias from "../Components/Categorias/TablaCategorias";
import RegistroCategoria from "../Components/Categorias/RegistroCategoria";
import EdicionCategoria from "../Components/Categorias/EdicionCategoria";
import EliminacionCategoria from "../Components/Categorias/EliminacionCategoria";
import CuadroBusquedas from "../Components/Busqueda/CuadroBusquedas";
import Paginacion from "../Components/Ordenamiento/Paginacion";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: "", descripcion: "" });
  const [categoriaEditada, setCategoriaEditada] = useState(null);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const itemsPerPage = 5;
  const categoriasCollection = collection(db, "Categoria");

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
    const unsubscribe = onSnapshot(categoriasCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCategorias(data);
      setCategoriasFiltradas(
        data.filter((categoria) =>
          categoria.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
          categoria.descripcion.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    });

    return () => unsubscribe();
  }, [searchText]);

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtradas = categorias.filter(
      (categoria) =>
        categoria.nombre.toLowerCase().includes(text) ||
        categoria.descripcion.toLowerCase().includes(text)
    );
    setCategoriasFiltradas(filtradas);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCategoriaEditada((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategoria = async () => {
    if (!nuevaCategoria.nombre || !nuevaCategoria.descripcion) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    setShowModal(false);

    // Manejo temporal offline
    const tempId = `temp_${Date.now()}`;
    const nueva = { ...nuevaCategoria, id: tempId };
    setCategorias((prev) => [...prev, nueva]);
    setCategoriasFiltradas((prev) => [...prev, nueva]);

    try {
      await addDoc(categoriasCollection, nuevaCategoria);
      setNuevaCategoria({ nombre: "", descripcion: "" });
    } catch (error) {
      console.error("Error al agregar categoría:", error);
      if (!isOffline) alert("Error al agregar categoría: " + error.message);
    }
  };

  const handleEditCategoria = async () => {
    if (!categoriaEditada.nombre || !categoriaEditada.descripcion) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    setShowEditModal(false);
    try {
      const ref = doc(db, "Categoria", categoriaEditada.id);
      await updateDoc(ref, categoriaEditada);
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      if (!isOffline) alert("Error al actualizar categoría: " + error.message);
    }
  };

  const handleDeleteCategoria = async () => {
    if (!categoriaAEliminar) return;
    setShowDeleteModal(false);
    try {
      const ref = doc(db, "Categoria", categoriaAEliminar.id);
      await deleteDoc(ref);
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      if (!isOffline) alert("Error al eliminar categoría: " + error.message);
    }
  };

  const openEditModal = (categoria) => {
    setCategoriaEditada({ ...categoria });
    setShowEditModal(true);
  };

  const openDeleteModal = (categoria) => {
    setCategoriaAEliminar(categoria);
    setShowDeleteModal(true);
  };

  const paginatedCategorias = categoriasFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Categorías {isOffline && "(Modo sin conexión)"}</h4>
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
      <TablaCategorias
        categorias={paginatedCategorias}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        totalItems={categorias.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={categoriasFiltradas.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <RegistroCategoria
        showModal={showModal}
        setShowModal={setShowModal}
        nuevaCategoria={nuevaCategoria}
        handleInputChange={handleInputChange}
        handleAddCategoria={handleAddCategoria}
      />
      <EdicionCategoria
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        categoriaEditada={categoriaEditada}
        handleEditInputChange={handleEditInputChange}
        handleEditCategoria={handleEditCategoria}
      />
      <EliminacionCategoria
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteCategoria={handleDeleteCategoria}
      />
    </Container>
  );
};

export default Categorias;
