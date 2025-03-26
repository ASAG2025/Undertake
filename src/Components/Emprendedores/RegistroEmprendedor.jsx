import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const RegistroEmprendedor = ({
  showModal,
  setShowModal,
  nuevoEmprendedor,
  handleInputChange,
  handleAddEmprendedor,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Emprendedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={nuevoEmprendedor.nombres}
              onChange={handleInputChange}
              placeholder="Ingresa el nombre"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              name="apellidos"
              value={nuevoEmprendedor.apellidos}
              onChange={handleInputChange}
              placeholder="Ingresa los apellidos"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={nuevoEmprendedor.cedula}
              onChange={handleInputChange}
              placeholder="Ingresa la cédula"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={nuevoEmprendedor.telefono}
              onChange={handleInputChange}
              placeholder="Ingresa el teléfono"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={nuevoEmprendedor.direccion}
              onChange={handleInputChange}
              placeholder="Ingresa la dirección"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddEmprendedor}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroEmprendedor;
