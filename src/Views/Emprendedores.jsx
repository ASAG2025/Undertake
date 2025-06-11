import React, { useState, useEffect } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { db } from "../Database/FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";

import {
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import TablaEmprendedores from "../Components/Emprendedores/TablaEmprendedores";
import RegistroEmprendedor from "../Components/Emprendedores/RegistroEmprendedor";
import EdicionEmprendedor from "../Components/Emprendedores/EdicionEmprendedor";
import EliminacionEmprendedor from "../Components/Emprendedores/EliminacionEmprendedor";
import CuadroBusquedas from "../Components/Busqueda/CuadroBusquedas";
import Paginacion from "../Components/Ordenamiento/Paginacion";

const Emprendedores = () => {
  const [emprendedores, setEmprendedores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevoEmprendedor, setNuevoEmprendedor] = useState({
    foto: "",
    nombres: "",
    apellidos: "",
    cedula: "",
    genero: "",
    telefono: "",
    direccion: "",
    usuario: "",
  });
  const [nuevoUsuario, setNuevoUsuario] = useState({
    correo: "",
    contraseña: "",
    rol: "Emprendedor",
  });
  const [emprendedorEditado, setEmprendedorEditado] = useState(null);
  const [emprendedorAEliminar, setEmprendedorAEliminar] = useState(null);
  const [emprendedoresFiltrados, setEmprendedoresFiltrados] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const emprendedorCollection = collection(db, "Emprendedor");
  const usuarioCollection = collection(db, "Usuario");

  const fetchData = async () => {
    try {
      const emprendedorData = await getDocs(emprendedorCollection);
      const fetchedEmprendedor = emprendedorData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const usuarioData = await getDocs(usuarioCollection);
      const fetchedUsuario = usuarioData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const emprendedoresConCorreo = fetchedEmprendedor.map((emprendedor) => {
        const usuario = fetchedUsuario.find((user) => user.id === emprendedor.usuario);
        return {
          ...emprendedor,
          correo: usuario ? usuario.correo : "No disponible",
        };
      });

      setEmprendedores(emprendedoresConCorreo);
      setEmprendedoresFiltrados(emprendedoresConCorreo);
    } catch (error) {
      console.error("Error al obtener los emprendedores:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtrados = emprendedores.filter((emprendedor) =>
      emprendedor.nombres.toLowerCase().includes(text) ||
      emprendedor.apellidos.toLowerCase().includes(text) ||
      emprendedor.cedula.toLowerCase().includes(text) ||
      emprendedor.telefono.toLowerCase().includes(text) ||
      emprendedor.direccion.toLowerCase().includes(text)
    );
    setEmprendedoresFiltrados(filtrados);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoEmprendedor((prev) => ({ 
      ...prev, 
      [name]: value }));
    setNuevoUsuario((prev) => ({ 
      ...prev, 
      [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEmprendedorEditado ((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoEmprendedor((prev) => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmprendedorEditado((prev) => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEmprendedor = async () => {
    const { foto, nombres, apellidos, cedula, genero, telefono, direccion } = nuevoEmprendedor;
    const { correo, contraseña, rol } = nuevoUsuario;

    if (!foto || !nombres || !apellidos || !cedula || !genero || !telefono || !direccion || !correo || !contraseña) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const auth = getAuth();
      const methods = await fetchSignInMethodsForEmail(auth, correo);
      if (methods.length > 0) {
        alert("El correo ya está registrado.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
      const uid = userCredential.user.uid;
      await setDoc(doc(db, "Usuario", uid), { correo, contraseña, rol });
      await setDoc(doc(db, "Emprendedor", uid), {
        foto,
        nombres,
        apellidos,
        cedula,
        genero,
        telefono,
        direccion,
        usuario: uid,
      });
      setShowModal(false);
      setNuevoEmprendedor({ foto: "", nombres: "", apellidos: "", cedula: "", genero: "", telefono: "", direccion: "", usuario: "" });
      setNuevoUsuario({ correo: "", contraseña: "", rol: "Emprendedor" });
      await fetchData();
    } catch (error) {
      console.error("Error al agregar el emprendedor:", error);
    }
  };

  const handleEditEmprendedor = async () => {
    if (!emprendedorEditado.foto || !emprendedorEditado.nombres || !emprendedorEditado.apellidos || !emprendedorEditado.cedula || !emprendedorEditado.telefono || !emprendedorEditado.direccion) {
      alert("Por favor, completa todos los campos antes de actualizar.");
      return;
    }
    try {
      const emprendedorRef = doc(db, "Emprendedor", emprendedorEditado.id);
      await updateDoc(emprendedorRef, emprendedorEditado);
      setShowEditModal(false);
      await fetchData();
    } catch (error) {
      console.error("Error al actualizar el emprendedor:", error);
    }
  };

  const handleDeleteEmprendedor = async () => {
    if (emprendedorAEliminar) {
      try {
        const uid = emprendedorAEliminar.id;
        await deleteDoc(doc(db, "Emprendedor", uid));
        await deleteDoc(doc(db, "Usuario", uid));
        setShowDeleteModal(false);
        await fetchData();
      } catch (error) {
        console.error("Error al eliminar el emprendedor y usuario:", error);
      }
    }
  };

  const openEditModal = (emprendedor) => {
    setEmprendedorEditado({ ...emprendedor });
    setShowEditModal(true);
  };

  const openDeleteModal = (emprendedor) => {
    setEmprendedorAEliminar(emprendedor);
    setShowDeleteModal(true);
  };

  const paginatedEmprendedores = emprendedoresFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Emprendedores</h4>
      <Row>
        <Col Col xs={12} sm={4} className="mb-2">
          <Button className="mb-3" onClick={() => setShowModal(true)} style={{ width: "100%" }}>
            <i className="bi bi-plus-circle me-2"></i>
            Agregar
          </Button>
        </Col>
        <Col xs={12} sm={8} className="mb-2">
          <CuadroBusquedas searchText={searchText} handleSearchChange={handleSearchChange} />
        </Col>
      </Row>
      <TablaEmprendedores
        emprendedores={paginatedEmprendedores}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        totalItems={emprendedores.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={emprendedoresFiltrados.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <RegistroEmprendedor
        showModal={showModal}
        setShowModal={setShowModal}
        nuevoEmprendedor={nuevoEmprendedor}
        nuevoUsuario={nuevoUsuario}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleAddEmprendedor={handleAddEmprendedor}
        usuarios={usuarios}
      />
      <EdicionEmprendedor
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        emprendedorEditado={emprendedorEditado}
        handleEditInputChange={handleEditInputChange}
        handleEditImageChange={handleEditImageChange}
        handleEditEmprendedor={handleEditEmprendedor}
        usuarios={usuarios}
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
