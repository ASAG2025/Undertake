import React, { useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { db, auth, storage } from "../Database/FirebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import RegistroTaller from "../Components/Talleres/RegistroTaller";
import TarjetaTaller from "../Components/Talleres/TarjetaTaller";

const Talleres = () => {
  const [talleres, setTalleres] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [financieras, setFinancieras] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const talleresCollection = collection(db, "Talleres");
  const inscripcionesCollection = collection(db, "InscripcionesTaller");
  const financierasCollection = collection(db, "Financieras");

  const [nuevoTaller, setNuevoTaller] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    videoType: "",
    video: null,
    video_url: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUsuarioActual(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchTalleres = async () => {
    const data = await getDocs(talleresCollection);
    const fetchedTalleres = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTalleres(fetchedTalleres);
  };

  const fetchInscripciones = async () => {
    if (!usuarioActual) return;
    const data = await getDocs(inscripcionesCollection);
    const fetched = data.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((i) => i.id_emprendedor === usuarioActual.uid);
    setInscripciones(fetched);
  };

  const fetchFinancieras = async () => {
    const data = await getDocs(financierasCollection);
    const fetchedFinancieras = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFinancieras(fetchedFinancieras);
  };

  useEffect(() => {
    fetchTalleres();
    fetchFinancieras();
  }, []);

  useEffect(() => {
    fetchInscripciones();
  }, [usuarioActual]);

  const obtenerEstado = (idTaller) => {
    const inscripcion = inscripciones.find((i) => i.id_taller === idTaller);
    return inscripcion ? inscripcion.estado : "No iniciado";
  };

  const obtenerIdInscripcion = (idTaller) => {
    const inscripcion = inscripciones.find((i) => i.id_taller === idTaller);
    return inscripcion ? inscripcion.id : null;
  };

  const obtenerNombreFinanciera = (idFinanciera) => {
    const financiera = financieras.find((f) => f.id === idFinanciera);
    return financiera ? financiera.nombre : "Sin financiera";
  };

  const handleInscribirse = async (idTaller) => {
    if (!usuarioActual) {
      alert("Inicia sesión para inscribirte.");
      return;
    }
    await addDoc(inscripcionesCollection, {
      id_taller: idTaller,
      id_emprendedor: usuarioActual.uid,
      estado: "No iniciado",
      fecha_inscripcion: new Date(),
    });
    fetchInscripciones();
  };

  const actualizarEstado = async (idInscripcion, nuevoEstado) => {
    if (!idInscripcion) return;
    const inscripcionRef = doc(db, "InscripcionesTaller", idInscripcion);
    await updateDoc(inscripcionRef, { estado: nuevoEstado });
    fetchInscripciones();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoTaller({ ...nuevoTaller, [name]: value });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNuevoTaller({ ...nuevoTaller, video: file });
    }
  };

  const handleAddTaller = async () => {
    if (!usuarioActual) {
      alert("Debes iniciar sesión como financiera para registrar talleres.");
      return;
    }

    let videoUrl = "";
    if (nuevoTaller.video) {
      const storageRef = ref(storage, `talleres_videos/${Date.now()}_${nuevoTaller.video.name}`);
      await uploadBytes(storageRef, nuevoTaller.video);
      videoUrl = await getDownloadURL(storageRef);
    }

    const tallerData = {
      nombre: nuevoTaller.nombre,
      descripcion: nuevoTaller.descripcion,
      categoria: nuevoTaller.categoria,
      videoType: nuevoTaller.videoType,
      video_url: videoUrl,
      id_financiera: usuarioActual.uid,
    };

    await addDoc(talleresCollection, tallerData);
    setShowModal(false);
    fetchTalleres();

    setNuevoTaller({
      nombre: "",
      descripcion: "",
      categoria:"",
      videoType: "",
      video: null,
      video_url: "",
    });
  };

  return (
    <Container className="mt-5">
      <br />
      <h4>Talleres Disponibles</h4>
      <div className="mb-4">
        <Button onClick={() => setShowModal(true)} className="btn btn-primary">
            <i className="bi bi-plus-circle me-2" />
            Agregar
        </Button>
      </div>

      {talleres.length > 0 ? (
        <Row>
          {talleres.map((taller) => {
            const estado = obtenerEstado(taller.id);
            const idInscripcion = obtenerIdInscripcion(taller.id);
            const nombreFinanciera = obtenerNombreFinanciera(taller.id_financiera);

            return (
              <TarjetaTaller
                key={taller.id}
                taller={taller}
                estado={estado}
                nombreFinanciera={nombreFinanciera}
                onInscribirse={() => handleInscribirse(taller.id)}
                onPlay={() =>
                  estado === "No iniciado" && actualizarEstado(idInscripcion, "En progreso")
                }
                onEnded={() => actualizarEstado(idInscripcion, "Completado")}
              />
            );
          })}
        </Row>
      ) : (
        <p className="text-muted mt-3">No hay talleres disponibles en este momento.</p>
      )}

      <RegistroTaller
        showModal={showModal}
        setShowModal={setShowModal}
        nuevoTaller={nuevoTaller}
        handleInputChange={handleInputChange}
        handleVideoChange={handleVideoChange}
        handleAddTaller={handleAddTaller}
      />
    </Container>
  );
};

export default Talleres;
