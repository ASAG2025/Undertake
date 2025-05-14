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
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../Database/AuthContext";
import { storage } from "../Database/FirebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import ProgramasFinanciamiento from "../Components/Financieras/ProgramasFinanciamiento";
import FormularioPrograma from "../Components/Financieras/FormularioPrograma";
import CuadroBusquedas from "../Components/Busqueda/CuadroBusquedas";

const Programas = () => {
  const { user } = useAuth();
  const [programas, setProgramas] = useState([]);
  const [programasFiltrados, setProgramasFiltrados] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [programaActual, setProgramaActual] = useState(null);

  const programasRef = collection(db, "programas_financiamiento");

  const obtenerProgramas = async () => {
    try {
      const q = query(programasRef, where("uid_financiera", "==", user.uid));
      const data = await getDocs(q);
      const resultados = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProgramas(resultados);
      setProgramasFiltrados(resultados);
    } catch (error) {
      console.error("Error al cargar programas:", error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      obtenerProgramas();
    }
  }, [user]);

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

  const abrirModalNuevo = () => {
    setProgramaActual(null);
    setModoEdicion(false);
    setShowModal(true);
  };

  const subirImagen = async (imagen) => {
    const storageRef = ref(storage, "programas/" + imagen.name);
    const uploadTask = uploadBytesResumable(storageRef, imagen);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve);
        }
      );
    });
  };

  const guardarPrograma = async (programa) => {
    if (
      !programa.Nombre_Programa ||
      !programa.Monto_Maximo ||
      !programa.Interes ||
      !programa.Fecha_Inicio ||
      !programa.Fecha_Fin
    ) {
      console.error("Faltan datos para agregar el programa");
      return;
    }

    try {
      let imagenUrl = "";
      if (programa.Imagen) {
        imagenUrl = await subirImagen(programa.Imagen);
      }

      const nuevoPrograma = {
        ...programa,
        uid_financiera: user.uid,
        Monto_Maximo: parseFloat(programa.Monto_Maximo),
        Imagen: imagenUrl,
      };

      await addDoc(programasRef, nuevoPrograma);
      setShowModal(false);
      obtenerProgramas();
    } catch (error) {
      console.error("Error al agregar:", error);
    }
  };

  const actualizarPrograma = async (id, datosActualizados) => {
    try {
      const programaRef = doc(db, "programas_financiamiento", id);
      await updateDoc(programaRef, datosActualizados);
      setShowModal(false);
      obtenerProgramas();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const eliminarPrograma = async (id) => {
    try {
      const refPrograma = doc(db, "programas_financiamiento", id);
      await deleteDoc(refPrograma);
      obtenerProgramas();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const editarPrograma = (programa) => {
    setProgramaActual(programa);
    setModoEdicion(true);
    setShowModal(true);
  };

  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Programas de Financiamiento</h4>
      <Row>
      <Col lg={2} md={2} sm={2} xs={3}>
      <Button className="mb-3" onClick={abrirModalNuevo} style={{width:"100%"}}>
        <i className="bi bi-plus-circle me-2"></i>
        Agregar
      </Button>
      </Col>
      <Col lg={3} md={3} sm={3} xs={5}>
      <CuadroBusquedas
        searchText={searchText}
        handleSearchChange={handleSearchChange}
      />
    </Col>
      </Row>
      <ProgramasFinanciamiento
        programas={programasFiltrados}
        onEditar={editarPrograma}
        onEliminar={eliminarPrograma}
      />

      <FormularioPrograma
        show={showModal}
        onHide={() => setShowModal(false)}
        onGuardar={modoEdicion ? actualizarPrograma : guardarPrograma}
        modoEdicion={modoEdicion}
        programa={programaActual}
      />
    </Container>
  );
};

export default Programas;