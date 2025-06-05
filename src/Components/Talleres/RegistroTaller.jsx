import { Modal, Form, Button, InputGroup } from "react-bootstrap";

const RegistroTaller = ({
  showModal,
  setShowModal,
  nuevoTaller,
  handleInputChange,
  handleVideoChange,
  handleAddTaller
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Taller</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Taller</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={nuevoTaller.nombre}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              rows={3}
              value={nuevoTaller.descripcion}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de Video</Form.Label>
            <Form.Select
              name="videoType"
              value={nuevoTaller.videoType}
              onChange={handleInputChange}
            >
              <option value="">Selecciona</option>
              <option value="file">Archivo Local</option>
              <option value="youtube">YouTube</option>
            </Form.Select>
          </Form.Group>

          {nuevoTaller.videoType === "file" && (
            <Form.Group className="mb-3">
              <Form.Label>Subir Video</Form.Label>
              <Form.Control
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
              />
            </Form.Group>
          )}

          {nuevoTaller.videoType === "youtube" && (
            <Form.Group className="mb-3">
              <Form.Label>URL de YouTube (embed o normal)</Form.Label>
              <Form.Control
                type="text"
                name="video"
                value={nuevoTaller.video}
                onChange={handleInputChange}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddTaller}>
          Guardar Taller
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroTaller;
