import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EdicionEmprendedor = ({
  showEditModal,
  setShowEditModal,
  emprendedorEditado,
  handleEditInputChange,
  handleEditEmprendedor,
}) => {
  if (!emprendedorEditado) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Emprendedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              type="text"
              name="nombres"
              value={emprendedorEditado.nombres}
              onChange={handleEditInputChange}
              placeholder="Ingresa los nombres"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              name="apellidos"
              value={emprendedorEditado.apellidos}
              onChange={handleEditInputChange}
              placeholder="Ingresa los apellidos"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={emprendedorEditado.cedula}
              onChange={handleEditInputChange}
              placeholder="Ingresa la cédula"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={emprendedorEditado.telefono}
              onChange={handleEditInputChange}
              placeholder="Ingresa el teléfono"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={emprendedorEditado.direccion}
              onChange={handleEditInputChange}
              placeholder="Ingresa la dirección"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditEmprendedor}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionEmprendedor;
