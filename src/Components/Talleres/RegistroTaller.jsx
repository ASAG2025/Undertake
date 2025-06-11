import React, { useState } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css'; // importante

// Función para extraer videoId de URL de YouTube
const obtenerVideoId = (url) => {
  if (!url) return null;
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const RegistroTaller = ({
  showModal,
  setShowModal,
  nuevoTaller,
  handleInputChange,
  handleVideoChange,
  handleAddTaller,
  categorias 
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
    if (videoType === "Local") {
      if (!video) return "Debes seleccionar un archivo de video.";
    }
    if (videoType === "YouTube") {
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
      validarVideo(
        nuevoTaller.videoType,
        nuevoTaller.videoType === "Local" ? nuevoTaller.videoArchivo : nuevoTaller.videoURL
      ) === ""
    );
  };

  // Extraemos el videoId para el iframe de YouTube
  const videoId = nuevoTaller.videoType === "YouTube" ? obtenerVideoId(nuevoTaller.videoURL) : null;

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

          {/* Categoría */}
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={nuevoTaller.categoria}
              onChange={handleInputChange}
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Select>
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
                <option value="">Selecciona tipo de video</option>
                <option value="Local">Local</option>
                <option value="YouTube">YouTube</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {validarVideoType(nuevoTaller.videoType)}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Subir archivo local */}
          {nuevoTaller.videoType === "Local" && (
            <Form.Group className="mb-3">
              <Form.Label>Subir Video</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-upload"></i></InputGroup.Text>
                <Form.Control
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  isInvalid={formValidated && !!validarVideo("Local", nuevoTaller.videoArchivo)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarVideo("Local", nuevoTaller.videoArchivo)}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          )}

          {/* URL de YouTube */}
          {nuevoTaller.videoType === "YouTube" && (
            <Form.Group className="mb-3">
              <Form.Label>URL de YouTube</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-link-45deg"></i></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="videoURL"
                  value={nuevoTaller.videoURL}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  isInvalid={formValidated && !!validarVideo("YouTube", nuevoTaller.videoURL)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarVideo("YouTube", nuevoTaller.videoURL)}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          )}

          {/* Vista previa video local */}
          {nuevoTaller.videoType === "Local" && nuevoTaller.videoArchivo && (
            <video
              width="100%"
              height="auto"
              controls
              src={URL.createObjectURL(nuevoTaller.videoArchivo)}
            />
          )}

          {/* Vista previa video YouTube */}
          {nuevoTaller.videoType === "YouTube" && videoId && (
            <div className="ratio ratio-16x9">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Video YouTube"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            </div>
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
