import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EdicionFinanciera = ({
  showEditModal,
  setShowEditModal,
  financieraEditada,
  handleEditInputChange,
  handleEditFinanciera,
}) => {
  if (!financieraEditada) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Financiera</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Institución</Form.Label>
            <Form.Control
              type="text"
              name="Nombre_Institucion"
              value={financieraEditada.Nombre_Institucion}
              onChange={handleEditInputChange}
              placeholder="Ingresa el nombre de la institución"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="Direccion"
              value={financieraEditada.Direccion}
              onChange={handleEditInputChange}
              placeholder="Ingresa la dirección"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contacto</Form.Label>
            <Form.Control
              type="text"
              name="Contacto"
              value={financieraEditada.Contacto}
              onChange={handleEditInputChange}
              placeholder="Ingresa el contacto"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditFinanciera}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionFinanciera;