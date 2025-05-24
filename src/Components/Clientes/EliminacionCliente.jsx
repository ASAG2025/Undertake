import React from "react";
import { Modal, Button } from "react-bootstrap";

const EliminacionCliente = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteCliente,
}) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar este cliente?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteCliente}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EliminacionCliente;
