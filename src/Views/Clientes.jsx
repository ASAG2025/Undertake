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

import TablaClientes from "../Components/Clientes/TablaClientes";
import RegistroCliente from "../Components/Clientes/RegistroCliente";
import EdicionCliente from "../Components/Clientes/EdicionCliente";
import EliminacionCliente from "../Components/Clientes/EliminacionCliente";
import CuadroBusquedas from "../Components/Busqueda/CuadroBusquedas";
import Paginacion from "../Components/Ordenamiento/Paginacion";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    foto: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    usuario: "",
  });
  const [nuevoUsuario, setNuevoUsuario] = useState({
    correo: "",
    contraseña: "",
    rol: "Cliente",
  });
  const [clienteEditado, setClienteEditado] = useState(null);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const clienteCollection = collection(db, "Cliente");
  const usuarioCollection = collection(db, "Usuario");

  const fetchData = async () => {
    try {
      const clienteData = await getDocs(clienteCollection);
      const fetchedCliente = clienteData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const usuarioData = await getDocs(usuarioCollection);
      const fetchedUsuario = usuarioData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const clientesConCorreo = fetchedCliente.map((cliente) => {
        const usuario = fetchedUsuario.find((user) => user.id === cliente.usuario);
        return {
          ...cliente,
          correo: usuario ? usuario.correo : "No disponible",
        };
      });

      setClientes(clientesConCorreo);
      setClientesFiltrados(clientesConCorreo);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtrados = clientes.filter((cliente) =>
      cliente.nombres.toLowerCase().includes(text) ||
      cliente.apellidos.toLowerCase().includes(text) ||
      cliente.telefono.toLowerCase().includes(text) ||
      cliente.direccion.toLowerCase().includes(text)
    );
    setClientesFiltrados(filtrados);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCliente((prev) => ({ 
      ...prev, 
      [name]: value }));
    setNuevoUsuario((prev) => ({ 
      ...prev, 
      [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setClienteEditado((prev) => ({ 
      ...prev, 
      [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoCliente((prev) => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClienteEditado((prev) => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCliente = async () => {
    const { foto, nombres, apellidos, telefono, direccion } = nuevoCliente;
    const { correo, contraseña, rol } = nuevoUsuario;

    if (!nombres || !apellidos || !correo || !contraseña) {
      alert("Por favor, completa los campos obligatorios.");
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
      await setDoc(doc(db, "Cliente", uid), {
        foto,
        nombres,
        apellidos,
        telefono,
        direccion,
        usuario: uid,
      });
      setShowModal(false);
      setNuevoCliente({ foto: "", nombres: "", apellidos: "", telefono: "", direccion: "", usuario: "" });
      setNuevoUsuario({ correo: "", contraseña: "", rol: "Cliente" });
      await fetchData();
    } catch (error) {
      console.error("Error al agregar el cliente:", error);
    }
  };

  const handleEditCliente = async () => {
    if (!clienteEditado.nombres || !clienteEditado.apellidos) {
      alert("Por favor, completa los campos obligatorios antes de actualizar.");
      return;
    }
    try {
      const clienteRef = doc(db, "Cliente", clienteEditado.id);
      await updateDoc(clienteRef, clienteEditado);
      setShowEditModal(false);
      await fetchData();
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  const handleDeleteCliente = async () => {
    if (clienteAEliminar) {
      try {
        const uid = clienteAEliminar.id;
        await deleteDoc(doc(db, "Cliente", uid));
        await deleteDoc(doc(db, "Usuario", uid));
        setShowDeleteModal(false);
        await fetchData();
      } catch (error) {
        console.error("Error al eliminar el cliente y usuario:", error);
      }
    }
  };

  const openEditModal = (cliente) => {
    setClienteEditado({ ...cliente });
    setShowEditModal(true);
  };

  const openDeleteModal = (cliente) => {
    setClienteAEliminar(cliente);
    setShowDeleteModal(true);
  };

  const paginatedClientes = clientesFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Clientes</h4>
      <Row>
        <Col lg={2} md={2} sm={2} xs={3}>
          <Button className="mb-3" onClick={() => setShowModal(true)} style={{ width: "100%" }}>
            <i className="bi bi-plus-circle me-2"></i>
            Agregar
          </Button>
        </Col>
        <Col lg={3} md={3} sm={3} xs={5}>
          <CuadroBusquedas searchText={searchText} handleSearchChange={handleSearchChange} />
        </Col>
      </Row>
      <TablaClientes
        clientes={paginatedClientes}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        totalItems={clientes.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={clientesFiltrados.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <RegistroCliente
        showModal={showModal}
        setShowModal={setShowModal}
        nuevoCliente={nuevoCliente}
        nuevoUsuario={nuevoUsuario}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleAddCliente={handleAddCliente}
        usuarios={usuarios}
      />
      <EdicionCliente
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        clienteEditado={clienteEditado}
        handleEditInputChange={handleEditInputChange}
        handleEditImageChange={handleEditImageChange}
        handleEditCliente={handleEditCliente}
        usuarios={usuarios}
      />
      <EliminacionCliente
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteCliente={handleDeleteCliente}
      />
    </Container>
  );
};

export default Clientes;