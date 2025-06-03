import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { collection, getDocs, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Database/FirebaseConfig";

import TablaVentas from "../Components/Ventas/TablaVentas";
import Paginacion from "../Components/Ordenamiento/Paginacion";
import RegistroVenta from "../Components/Ventas/ModalRegistroVenta";
import EdicionVenta from "../Components/Ventas/ModalEdicionVenta"; 
import EliminacionVenta from "../Components/Ventas/ModalEliminacionVenta"; 

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ventaEditada, setVentaEditada] = useState(null);
  const [ventaAEliminar, setVentaAEliminar] = useState(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const ventasCollection = collection(db, "Ventas");

  const fetchVentas = async () => {
    try {
      const data = await getDocs(ventasCollection);
      const listaVentas = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVentas(listaVentas);
    } catch (error) {
      console.error("Error obteniendo ventas:", error);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  const openEditModal = (venta) => {
    setVentaEditada(venta);
    setShowEditModal(true);
  };

  const openDeleteModal = (venta) => {
    setVentaAEliminar(venta);
    setShowDeleteModal(true);
  };

  const handleDeleteVenta = async () => {
    if (!ventaAEliminar) return;
    try {
      await deleteDoc(doc(db, "Ventas", ventaAEliminar.id));
      setShowDeleteModal(false);
      fetchVentas();
    } catch (error) {
      console.error("Error eliminando venta:", error);
    }
  };

  return (
    <Container className="mt-5">
        <br />
          <h4>Gestión de Ventas</h4>
      <Row>
        <Col className="text-end">
          <Button onClick={() => setShowRegistroModal(true)}>Agregar Venta</Button>
        </Col>
      </Row>

      <TablaVentas
        ventas={ventas}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        totalItems={ventas.length}
      />

      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={ventas.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Modal RegistroVenta */}
      <RegistroVenta
        show={showRegistroModal}
        onHide={() => setShowRegistroModal(false)}
        onVentaAgregada={fetchVentas}
      />

      {/* Modal EdicionVenta */}
      <EdicionVenta
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        venta={ventaEditada}
        onVentaEditada={fetchVentas}
      />

      {/* Modal EliminacionVenta */}
      <EliminacionVenta
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirmDelete={handleDeleteVenta}
      />
    </Container>
  );
};

export default Ventas;