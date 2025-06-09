import React from "react";
import { Modal, Button } from "react-bootstrap";

const EliminacionVenta = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteVenta
}) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          ¿Estás seguro que deseas eliminar la venta?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteVenta}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EliminacionVenta;