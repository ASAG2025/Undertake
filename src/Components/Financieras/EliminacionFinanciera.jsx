import React from "react";
import { Modal, Button } from "react-bootstrap";

const EliminacionFinanciera = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteFinanciera,
}) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar esta financiera?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteFinanciera}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EliminacionFinanciera;