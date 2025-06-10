import React, { useState, useEffect } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css'; // importante

const RegistroTaller = ({
  showModal,
  setShowModal,
  nuevoTaller,
  handleInputChange,
  handleVideoChange,
  handleAddTaller
}) => {
  const palabrasInapropiadas = ["inapropiado", "ofensivo", "malo"];
  const letrasEspaciosRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

  const [formValidated, setFormValidated] = useState(false);

  const contienePalabrasInapropiadas = (valor) =>
    palabrasInapropiadas.some((palabra) =>
      valor.toLowerCase().includes(palabra)
    );

  const validarNombre = (valor) => {
    if (!valor) return "El nombre del taller es obligatorio.";
    if (!letrasEspaciosRegex.test(valor)) return "Solo se permiten letras y espacios.";
    if (contienePalabrasInapropiadas(valor)) return "El nombre contiene palabras inapropiadas.";
    return "";
  };

  const validarDescripcion = (valor) => {
    if (!valor) return "La descripción es obligatoria.";
    if (contienePalabrasInapropiadas(valor)) return "La descripción contiene palabras inapropiadas.";
    if (valor.length < 10) return "La descripción debe tener al menos 10 caracteres.";
    return "";
  };

  const validarVideoType = (valor) => {
    if (!valor) return "Debes seleccionar un tipo de video.";
    return "";
  };

  const validarVideo = (videoType, video) => {
    if (videoType === "file") {
      if (!video) return "Debes seleccionar un archivo de video.";
    }
    if (videoType === "youtube") {
      if (!video) return "Debes ingresar una URL de YouTube.";
      const urlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
      if (!urlRegex.test(video)) return "Debe ser una URL válida de YouTube.";
    }
    return "";
  };

  const isFormValid = () => {
    return (
      validarNombre(nuevoTaller.nombre) === "" &&
      validarDescripcion(nuevoTaller.descripcion) === "" &&
      validarVideoType(nuevoTaller.videoType) === "" &&
      validarVideo(nuevoTaller.videoType, nuevoTaller.video) === ""
    );
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Taller</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          {/* Nombre */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Taller</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-easel"></i></InputGroup.Text>
              <Form.Control
                type="text"
                name="nombre"
                value={nuevoTaller.nombre}
                onChange={handleInputChange}
                isInvalid={formValidated && !!validarNombre(nuevoTaller.nombre)}
              />
              <Form.Control.Feedback type="invalid">
                {validarNombre(nuevoTaller.nombre)}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Descripción */}
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-card-text"></i></InputGroup.Text>
              <Form.Control
                as="textarea"
                name="descripcion"
                rows={3}
                value={nuevoTaller.descripcion}
                onChange={handleInputChange}
                isInvalid={formValidated && !!validarDescripcion(nuevoTaller.descripcion)}
              />
              <Form.Control.Feedback type="invalid">
                {validarDescripcion(nuevoTaller.descripcion)}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Tipo de video */}
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Video</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-film"></i></InputGroup.Text>
              <Form.Select
                name="videoType"
                value={nuevoTaller.videoType}
                onChange={handleInputChange}
                isInvalid={formValidated && !!validarVideoType(nuevoTaller.videoType)}
              >
                <option value="">Selecciona</option>
                <option value="file">Archivo Local</option>
                <option value="youtube">YouTube</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {validarVideoType(nuevoTaller.videoType)}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Subir archivo */}
          {nuevoTaller.videoType === "file" && (
            <Form.Group className="mb-3">
              <Form.Label>Subir Video</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-upload"></i></InputGroup.Text>
                <Form.Control
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  isInvalid={formValidated && !!validarVideo("file", nuevoTaller.video)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarVideo("file", nuevoTaller.video)}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          )}

          {/* URL de YouTube */}
          {nuevoTaller.videoType === "youtube" && (
            <Form.Group className="mb-3">
              <Form.Label>URL de YouTube</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-link-45deg"></i></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="video"
                  value={nuevoTaller.video}
                  onChange={handleInputChange}
                  isInvalid={formValidated && !!validarVideo("youtube", nuevoTaller.video)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarVideo("youtube", nuevoTaller.video)}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          )}

        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          <i className="bi bi-x-circle"></i> Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setFormValidated(true);
            if (isFormValid()) handleAddTaller();
          }}
        >
          <i className="bi bi-save"></i> Guardar 
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroTaller;
