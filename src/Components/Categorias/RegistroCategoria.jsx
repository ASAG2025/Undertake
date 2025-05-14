import React from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";

const RegistroCategoria = ({
  showModal,
  setShowModal,
  nuevaCategoria,
  handleInputChange,
  handleAddCategoria,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Nombre de la categoría con ícono */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-tag" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="nombre"
                value={nuevaCategoria.nombre}
                onChange={handleInputChange}
                placeholder="Ingresa el nombre"
              />
            </InputGroup>
          </Form.Group>

          {/* Descripción de la categoría con ícono */}
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-card-text" />
              </InputGroup.Text>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={nuevaCategoria.descripcion}
                onChange={handleInputChange}
                placeholder="Ingresa la descripción"
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddCategoria}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroCategoria;
