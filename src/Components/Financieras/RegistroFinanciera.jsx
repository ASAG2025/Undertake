import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const RegistroFinanciera = ({
  showModal,
  setShowModal,
  nuevaFinanciera,
  handleInputChange,
  handleAddFinanciera,
  handleFileChange
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Institución Financiera</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Institución</Form.Label>
            <Form.Control
              type="text"
              name="Nombre_Institucion"
              value={nuevaFinanciera.Nombre_Institucion}
              onChange={handleInputChange}
              placeholder="Ingresa el nombre de la institución"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="Direccion"
              value={nuevaFinanciera.Direccion}
              onChange={handleInputChange}
              placeholder="Ingresa la dirección"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contacto</Form.Label>
            <Form.Control
              type="text"
              name="Contacto"
              value={nuevaFinanciera.Contacto}
              onChange={handleInputChange}
              placeholder="Ingresa el contacto"
            />
          </Form.Group>
          <Form.Group controlId="formImagen">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddFinanciera}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroFinanciera;