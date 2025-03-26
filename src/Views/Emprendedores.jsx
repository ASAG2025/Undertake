import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { db } from "../Database/FirebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
// Importaciones de componentes personalizados
import TablaEmprendedores from "../Components/Emprendedores/TablaEmprendedores";
import RegistroEmprendedor from "../Components/Emprendedores/RegistroEmprendedor";
import EdicionEmprendedor from "../Components/Emprendedores/EdicionEmprendedor";
import EliminacionEmprendedor from "../Components/Emprendedores/EliminacionEmprendedor";

const Emprendedores = () => {
  
  // Estados para manejo de datos
  const [emprendedores, setEmprendedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevoEmprendedor, setNuevoEmprendedor] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    telefono: "",
    direccion: "",
  });
  const [emprendedorEditado, setEmprendedorEditado] = useState(null);
  const [emprendedorAEliminar, setEmprendedorAEliminar] = useState(null);

  // Referencia a la colección de emprendedores en Firestore
  const emprendedorCollection = collection(db, "Emprendedor");

  // Función para obtener todos los emprendedores de Firestore
  const fetchEmprendedor = async () => {
    try {
      const data = await getDocs(emprendedorCollection);
      const fetchedEmprendedor = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmprendedores(fetchedEmprendedor);
    } catch (error) {
      console.error("Error al obtener los emprendedores:", error);
    }
  };

  // Hook useEffect para carga inicial de datos
  useEffect(() => {
    fetchEmprendedor();
  }, []);

  // Manejador de cambios en inputs del formulario de nuevo emprendedor
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoEmprendedor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador de cambios en inputs del formulario de edición
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEmprendedorEditado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para agregar un nuevo emprendedor (CREATE)
  const handleAddEmprendedor = async () => {
    if (!nuevoEmprendedor.nombres || !nuevoEmprendedor.apellidos || !nuevoEmprendedor.cedula || !nuevoEmprendedor.telefono || !nuevoEmprendedor.direccion) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }
    try {
      await addDoc(emprendedorCollection, nuevoEmprendedor);
      setShowModal(false);
      setNuevoRegistro({ nombres: "", apellidos: "", cedula: "", telefono: "", direccion: "" });
      await fetchEmprendedor();
    } catch (error) {
      console.error("Error al agregar el emprendedor:", error);
    }
  };

  // Función para actualizar un emprendedor existente (UPDATE)
  const handleEditEmprendedor = async () => {
    if (!emprendedorEditado.nombres || !emprendedorEditado.apellidos || !emprendedorEditado.cedula || !emprendedorEditado.telefono || !emprendedorEditado.direccion) {
      alert("Por favor, completa todos los campos antes de actualizar.");
      return;
    }
    try {
      const emprendedorRef = doc(db, "Emprendedor", emprendedorEditado.id);
      await updateDoc(emprendedorRef, emprendedorEditado);
      setShowEditModal(false);
      await fetchEmprendedor();
    } catch (error) {
      console.error("Error al actualizar el emprendedor:", error);
    }
  };

  // Función para eliminar un emprendedor (DELETE)
  const handleDeleteEmprendedor = async () => {
    if (emprendedorAEliminar) {
      try {
        const emprendedorRef = doc(db, "Emprendedor", emprendedorAEliminar.id);
        await deleteDoc(emprendedorRef);
        setShowDeleteModal(false);
        await fetchEmprendedor();
      } catch (error) {
        console.error("Error al eliminar el emprendedor:", error);
      }
    }
  };

  // Función para abrir el modal de edición con datos prellenados
  const openEditModal = (emprendedor) => {
    setEmprendedorEditado({ ...emprendedor });
    setShowEditModal(true);
  };

  // Función para abrir el modal de eliminación
  const openDeleteModal = (emprendedor) => {
    setEmprendedorAEliminar(emprendedor);
    setShowDeleteModal(true);
  };

  // Renderizado del componente
  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Emprendedores</h4>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Agregar emprendedor
      </Button>
      <TablaEmprendedores
        emprendedores={emprendedores}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
      <RegistroEmprendedor
        showModal={showModal}
        setShowModal={setShowModal}
        nuevoEmprendedor={nuevoEmprendedor}
        handleInputChange={handleInputChange}
        handleAddEmprendedor={handleAddEmprendedor}
      />
      <EdicionEmprendedor
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        emprendedorEditado={emprendedorEditado}
        handleEditInputChange={handleEditInputChange}
        handleEditEmprendedor={handleEditEmprendedor}
      />
      <EliminacionEmprendedor
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteEmprendedor={handleDeleteEmprendedor}
      />
    </Container>
  );
};

export default Emprendedores;
