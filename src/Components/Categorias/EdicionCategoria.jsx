import React from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";

const EdicionCategoria = ({
  showEditModal,
  setShowEditModal,
  categoriaEditada,
  handleEditInputChange,
  handleEditCategoria,
}) => {
  if (!categoriaEditada) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Campo Nombre con ícono */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-tag" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="nombre"
                value={categoriaEditada.nombre}
                onChange={handleEditInputChange}
                placeholder="Ingresa el nombre"
              />
            </InputGroup>
          </Form.Group>

          {/* Campo Descripción con ícono */}
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
                value={categoriaEditada.descripcion}
                onChange={handleEditInputChange}
                placeholder="Ingresa la descripción"
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditCategoria}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionCategoria;
