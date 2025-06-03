// src/Components/Ventas/ModalEliminacionVenta.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Database/FirebaseConfig";

const ModalEliminacionVenta = ({
  show,
  onHide,
  ventaAEliminar,
  fetchVentas,
  setShowEliminacion,
}) => {
  const handleDelete = async () => {
    try {
      if (ventaAEliminar) {
        await deleteDoc(doc(db, "Ventas", ventaAEliminar.id));
        fetchVentas();
        setShowEliminacion(false);
      }
    } catch (error) {
      console.error("Error al eliminar venta:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro que deseas eliminar la venta del cliente{" "}
          <strong>{ventaAEliminar?.clienteNombre}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionVenta;