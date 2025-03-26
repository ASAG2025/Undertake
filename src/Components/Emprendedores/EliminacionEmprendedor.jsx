import React from "react";
import { Modal, Button } from "react-bootstrap";

const EliminacionEmprendedor = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteEmprendedor,
}) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar este emprendedor?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteEmprendedor}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EliminacionEmprendedor;