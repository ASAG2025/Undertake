import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { db } from "../Database/FirebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import CardsFinancieras from "../Components/Financieras/CardsFinancieras";
import RegistroFinanciera from "../Components/Financieras/RegistroFinanciera";
import EdicionFinanciera from "../Components/Financieras/EdicionFinanciera";
import EliminacionFinanciera from "../Components/Financieras/EliminacionFinanciera";
import CuadroBusqueda from "../Components/Busqueda/CuadroBusquedas";
import Paginacion from "../Components/Ordenamiento/Paginacion";

const Financieras = () => {
  const [financieras, setFinancieras] = useState([]);
  const [financierasFiltradas, setFinancierasFiltradas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlineChanges, setOfflineChanges] = useState({
    added: [],
    updated: [],
    deleted: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevaFinanciera, setNuevaFinanciera] = useState({
    Nombre_Institucion: "",
    Direccion: "",
    Contacto: "",
    Imagen: null,
  });
  const [financieraEditada, setFinancieraEditada] = useState(null);
  const [financieraAEliminar, setFinancieraAEliminar] = useState(null);

  const financieraCollection = collection(db, "Financiera");

  const fetchFinancieras = async () => {
    try {
      const data = await getDocs(financieraCollection);
      const fetched = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFinancieras(fetched);
      setFinancierasFiltradas(fetched);
    } catch (error) {
      if (isOffline) {
        console.warn("Sin conexión. No se puede cargar.");
      } else {
        console.error("Error al obtener financieras:", error);
      }
    }
  };

  useEffect(() => {
    fetchFinancieras();

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtradas = financieras.filter((fin) =>
      fin.Nombre_Institucion.toLowerCase().includes(text) ||
      fin.Contacto.toLowerCase().includes(text) ||
      fin.Direccion.toLowerCase().includes(text)
    );
    setFinancierasFiltradas(filtradas);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaFinanciera((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setFinancieraEditada((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (showEditModal) {
        setFinancieraEditada((prev) => ({
          ...prev,
          Imagen: reader.result,
        }));
      } else {
        setNuevaFinanciera((prev) => ({
          ...prev,
          Imagen: reader.result,
        }));
      }
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAddFinanciera = async () => {
    if (!nuevaFinanciera.Nombre_Institucion || !nuevaFinanciera.Direccion || !nuevaFinanciera.Contacto) {
      alert("Completa todos los campos.");
      return;
    }

    if (isOffline) {
      const tempId = `temp_${Date.now()}`;
      const financieraConId = { ...nuevaFinanciera, id: tempId };
      setOfflineChanges((prev) => ({
        ...prev,
        added: [...prev.added, financieraConId],
      }));
      setFinancieras((prev) => [...prev, financieraConId]);
      setFinancierasFiltradas((prev) => [...prev, financieraConId]);
      alert("Estás offline. Se guardará localmente.");
      setShowModal(false);
      return;
    }

    try {
      await addDoc(financieraCollection, nuevaFinanciera);
      alert("Financiera agregada.");
      setShowModal(false);
      await fetchFinancieras();
    } catch (error) {
      console.error("Error al agregar financiera:", error);
    }
  };

  const handleEditFinanciera = async () => {
    if (!financieraEditada.Nombre_Institucion || !financieraEditada.Direccion || !financieraEditada.Contacto) {
      alert("Completa todos los campos.");
      return;
    }

    if (isOffline) {
      setOfflineChanges((prev) => ({
        ...prev,
        updated: [...prev.updated, { id: financieraEditada.id, data: financieraEditada }],
      }));
      setFinancieras((prev) =>
        prev.map((f) => (f.id === financieraEditada.id ? financieraEditada : f))
      );
      setFinancierasFiltradas((prev) =>
        prev.map((f) => (f.id === financieraEditada.id ? financieraEditada : f))
      );
      alert("Estás offline. Cambios guardados localmente.");
      setShowEditModal(false);
      return;
    }

    try {
      const financieraRef = doc(db, "Financiera", financieraEditada.id);
      await updateDoc(financieraRef, financieraEditada);
      alert("Actualizado correctamente.");
      setShowEditModal(false);
      await fetchFinancieras();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const handleDeleteFinanciera = async () => {
    if (!financieraAEliminar) return;

    if (isOffline) {
      setOfflineChanges((prev) => ({
        ...prev,
        deleted: [...prev.deleted, financieraAEliminar.id],
      }));
      setFinancieras((prev) => prev.filter((f) => f.id !== financieraAEliminar.id));
      setFinancierasFiltradas((prev) => prev.filter((f) => f.id !== financieraAEliminar.id));
      alert("Estás offline. Eliminación guardada localmente.");
      setShowDeleteModal(false);
      return;
    }

    try {
      const financieraRef = doc(db, "Financiera", financieraAEliminar.id);
      await deleteDoc(financieraRef);
      alert("Eliminado correctamente.");
      setShowDeleteModal(false);
      await fetchFinancieras();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const openEditModal = (financiera) => {
    setFinancieraEditada(financiera);
    setShowEditModal(true);
  };

  const openDeleteModal = (financiera) => {
    setFinancieraAEliminar(financiera);
    setShowDeleteModal(true);
  };

  const paginatedFinancieras = financierasFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="mt-5">
      {isOffline && (
        <div className="alert alert-warning text-center">
          ⚠ Estás sin conexión. Los cambios se guardarán localmente.
        </div>
      )}

      <br />
      <h4>Gestión de Financieras</h4>

      <Row>
         <Col lg={2}>
           <Button className="mb-3" onClick={() => setShowModal(true)} style={{ width: "100%" }}>
             <i className="bi bi-plus-circle me-2"></i>
             Agregar
           </Button>
         </Col>
         <Col lg={3}>
           <CuadroBusqueda searchText={searchText} handleSearchChange={handleSearchChange} />
         </Col>
       </Row>
       
      <CardsFinancieras
        financieras={paginatedFinancieras}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={financierasFiltradas.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <RegistroFinanciera
        showModal={showModal}
        setShowModal={setShowModal}
        nuevaFinanciera={nuevaFinanciera}
        handleInputChange={handleInputChange}
        handleAddFinanciera={handleAddFinanciera}
        handleFileChange={handleFileChange}
      />

      <EdicionFinanciera
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        financieraEditada={financieraEditada}
        handleEditInputChange={handleEditInputChange}
        handleEditFinanciera={handleEditFinanciera}
        handleFileChange={handleFileChange}
      />

      <EliminacionFinanciera
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteFinanciera={handleDeleteFinanciera}
      />
    </Container>
  );
};

export default Financieras;