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
import CardsFinancieras from "../Components/Financieras/CardsFinancieras"; // Modificado
import RegistroFinanciera from "../Components/Financieras/RegistroFinanciera";
import EdicionFinanciera from "../Components/Financieras/EdicionFinanciera";
import EliminacionFinanciera from "../Components/Financieras/EliminacionFinanciera";

const Financieras = () => {
  
  // Estados para manejo de datos
  const [financieras, setFinancieras] = useState([]);
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

  // Referencia a la colección de financieras en Firestore
  const financieraCollection = collection(db, "Financiera");

  // Función para obtener todas las financieras de Firestore
  const fetchFinancieras = async () => {
    try {
      const data = await getDocs(financieraCollection);
      const fetchedFinancieras = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFinancieras(fetchedFinancieras);
    } catch (error) {
      console.error("Error al obtener las financieras:", error);
    }
  };

  // Hook useEffect para carga inicial de datos
  useEffect(() => {
    fetchFinancieras();
  }, []);

  // Manejador de cambios en inputs del formulario de nueva financiera
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaFinanciera((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador de cambios en inputs del formulario de edición
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setFinancieraEditada((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if ( showEditModal) {
          setFinancieraEditada((financieraEditada) => ({
            ...financieraEditada,
            Imagen: reader.result, 
          }))
        } else {
          setNuevaFinanciera({
            ...nuevaFinanciera,
            Imagen: reader.result,
          });
        }
      }
      reader.readAsDataURL(file);
    }
  };

  // Función para agregar una nueva financiera (CREATE)
  const handleAddFinanciera = async () => {
    if (!nuevaFinanciera.Nombre_Institucion || !nuevaFinanciera.Direccion || !nuevaFinanciera.Contacto) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }
    try {
      await addDoc(financieraCollection, nuevaFinanciera);
      alert('Financiera agregada correctamente.');
      setShowModal(false);
      setNuevaFinanciera({ Nombre_Institucion: "", Direccion: "", Contacto: "" });
      await fetchFinancieras();
    } catch (error) {
      console.error("Error al agregar la financiera:", error);
    }
  };

  // Función para actualizar una financiera existente (UPDATE)
  const handleEditFinanciera = async () => {
    if (!financieraEditada.Nombre_Institucion || !financieraEditada.Direccion || !financieraEditada.Contacto) {
      alert("Por favor, completa todos los campos antes de actualizar.");
      return;
    }
    try {
      const financieraRef = doc(db, "Financiera", financieraEditada.id);
      alert("Datos actualizado correctamente");
      await updateDoc(financieraRef, financieraEditada);
      setShowEditModal(false);
      await fetchFinancieras();
    } catch (error) {
      console.error("Error al actualizar la financiera:", error);
    }
  };

  // Función para eliminar una financiera (DELETE)
  const handleDeleteFinanciera = async () => {
    if (financieraAEliminar) {
      try {
        const financieraRef = doc(db, "Financiera", financieraAEliminar.id);
        alert("Financiera eliminada correctamente");
        await deleteDoc(financieraRef);
        setShowDeleteModal(false);
        await fetchFinancieras();
      } catch (error) {
        console.error("Error al eliminar la financiera:", error);
      }
    }
  };

  // Función para abrir el modal de edición con datos prellenados
  const openEditModal = (financiera) => {
    setFinancieraEditada({ ...financiera });
    setShowEditModal(true);
  };

  // Función para abrir el modal de eliminación
  const openDeleteModal = (financiera) => {
    setFinancieraAEliminar(financiera);
    setShowDeleteModal(true);
  };

  // Renderizado del componente
  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Financieras</h4>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Agregar financiera
      </Button>
      <CardsFinancieras
        financieras={financieras}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
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