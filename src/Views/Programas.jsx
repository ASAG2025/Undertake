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

// Importaciones de componentes personalizados
import ProgramasFinanciamiento from "../Components/Financieras/ProgramasFinanciamiento";
import FormularioPrograma from "../Components/Financieras/FormularioPrograma";
import CuadroBusqueda from "../Components/Busqueda/CuadroBusquedas";
import Paginacion from "../Components/Ordenamiento/Paginacion";

const Programas = () => {
  const [programas, setProgramas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [programaEditado, setProgramaEditado] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [programasFiltrados, setProgramasFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlineChanges, setOfflineChanges] = useState({
    added: [],
    updated: [],
    deleted: [],
  });

  const programasRef = collection(db, "programas_financiamiento");

  const obtenerProgramas = async () => {
    try {
      const data = await getDocs(programasRef);
      const fetchedProgramas = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProgramas(fetchedProgramas);
      setProgramasFiltrados(fetchedProgramas);
    } catch (error) {
      if (isOffline) {
        console.warn("Sin conexión. No se pueden cargar datos nuevos.");
      } else {
        console.error("Error al obtener los programas:", error);
      }
    }
  };

  useEffect(() => {
    obtenerProgramas();

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
    const filtrados = programas.filter((programa) =>
      programa.Nombre_Programa.toLowerCase().includes(text) ||
      programa.Monto_Maximo.toString().includes(text) ||
      programa.Interes.toString().includes(text)
    );
    setProgramasFiltrados(filtrados);
  };

  const handleAddPrograma = async (programa) => {
    if (!programa.Nombre_Programa || !programa.Monto_Maximo || !programa.Interes) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    if (isOffline) {
      const tempId = `temp_${Date.now()}`;
      const programaConId = { ...programa, id: tempId };
      setOfflineChanges((prev) => ({
        ...prev,
        added: [...prev.added, programaConId],
      }));
      alert("Estás offline. El cambio se guardará cuando te conectes.");
    }

    try {
      await addDoc(programasRef, programa);
      alert('Programa agregado correctamente.');
      setShowModal(false);
      await obtenerProgramas();
    } catch (error) {
      console.error("Error al agregar el programa:", error);
    }
  };

  const handleEditPrograma = async (programa) => {
    if (!programa.Nombre_Programa || !programa.Monto_Maximo || !programa.Interes) {
      alert("Por favor, completa todos los campos antes de actualizar.");
      return;
    }

    if (isOffline) {
      setOfflineChanges((prev) => ({
        ...prev,
        updated: [
          ...prev.updated,
          { id: programa.id, data: programa },
        ],
      }));
      alert("Estás offline. El cambio se guardará cuando te conectes.");
    }

    try {
      const programaRef = doc(db, "programas_financiamiento", programa.id);
      await updateDoc(programaRef, programa);
      setProgramaEditado(null);
      setShowModal(false);
      await obtenerProgramas();
    } catch (error) {
      console.error("Error al actualizar el programa:", error);
    }
  };

  const handleDeletePrograma = async (programa) => {
    try {
      const programaRef = doc(db, "programas_financiamiento", programa.id);
      await deleteDoc(programaRef);
      alert("Programa eliminado correctamente.");
      await obtenerProgramas();
    } catch (error) {
      console.error("Error al eliminar el programa:", error);
    }
  };

  const paginatedProgramas = programasFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="mt-5">
      {isOffline && (
        <div className="alert alert-warning text-center" role="alert">
          ⚠ Estás sin conexión. Los cambios se guardarán localmente y se sincronizarán automáticamente al volver a estar en línea.
        </div>
      )}

      <h4>Gestión de Programas de Financiamiento</h4>

      {/* Botón primero */}
      <div className="mb-3">
        <Button onClick={() => {
          setProgramaEditado(null);
          setShowModal(true);
        }}>
          Agregar programa
        </Button>
      </div>

      {/* Cuadro de búsqueda debajo del botón */}
      <div className="mb-4">
        <CuadroBusqueda
          searchText={searchText}
          handleSearchChange={handleSearchChange}
        />
      </div>

      <ProgramasFinanciamiento
        programas={paginatedProgramas}
        onEditar={(programa) => {
          setProgramaEditado(programa);
          setShowModal(true);
        }}
        onEliminar={handleDeletePrograma}
      />

      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={programasFiltrados.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <FormularioPrograma
        show={showModal}
        onHide={() => setShowModal(false)}
        onGuardar={handleAddPrograma}
        programa={programaEditado}
        onGuardarEdicion={handleEditPrograma}
      />
    </Container>
  );
};

export default Programas;