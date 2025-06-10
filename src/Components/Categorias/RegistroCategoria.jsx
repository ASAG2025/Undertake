import React, { useState, useEffect } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";

const RegistroCategoria = ({
  showModal,
  setShowModal,
  nuevaCategoria,
  handleInputChange,
  handleAddCategoria,
}) => {
  // Expresiones y listas
  const palabrasInapropiadas = ["inapropiado", "ofensivo", "malo"];
  const letrasEspaciosRegex = /^[A-Za-z\s]+$/;

  // Estados de validación
  const [nombreValido, setNombreValido] = useState(false);
  const [descripcionValida, setDescripcionValida] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  // Validaciones
  const contienePalabrasInapropiadas = (valor) =>
    palabrasInapropiadas.some((p) => valor.toLowerCase().includes(p));

  const validarNombre = (valor) => {
    if (!valor) return "El nombre es obligatorio.";
    if (!letrasEspaciosRegex.test(valor))
      return "Solo se permiten letras y espacios.";
    if (contienePalabrasInapropiadas(valor))
      return "El nombre contiene palabras inapropiadas.";
    if (valor.length < 3) return "Debe tener al menos 3 caracteres.";
    return "";
  };

  const validarDescripcion = (valor) => {
    if (!valor) return "La descripción es obligatoria.";
    if (contienePalabrasInapropiadas(valor))
      return "La descripción contiene palabras inapropiadas.";
    if (valor.length < 10) return "Debe tener al menos 10 caracteres.";
    return "";
  };

  // Validar formulario completo
  const isFormValid = () =>
    validarNombre(nuevaCategoria.nombre) === "" &&
    validarDescripcion(nuevaCategoria.descripcion) === "";

  // Actualizar estados booleanos de validación en cada cambio
  useEffect(() => {
    setNombreValido(validarNombre(nuevaCategoria.nombre) === "");
    setDescripcionValida(validarDescripcion(nuevaCategoria.descripcion) === "");
  }, [nuevaCategoria]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
                isInvalid={formValidated && !!validarNombre(nuevaCategoria.nombre)}
              />
              <Form.Control.Feedback type="invalid">
                {validarNombre(nuevaCategoria.nombre)}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

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
                isInvalid={formValidated && !!validarDescripcion(nuevaCategoria.descripcion)}
              />
              <Form.Control.Feedback type="invalid">
                {validarDescripcion(nuevaCategoria.descripcion)}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setFormValidated(true);
            if (isFormValid()) {
              handleAddCategoria();
            }
          }}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroCategoria;
