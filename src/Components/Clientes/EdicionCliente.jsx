import React from "react";
import { Modal, Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const EdicionCliente = ({
  showEditModal,
  setShowEditModal,
  clienteEditado,
  handleEditInputChange,
  handleEditCliente,
  handleEditImageChange,
}) => {
  if (!clienteEditado) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Imagen de perfil */}
          <Form.Group className="mb-3 text-center" style={{ position: "relative" }}>
            <Form.Control
              id="editFileInputCliente"
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
              style={{ display: "none" }}
            />
            <div
              style={{
                width: "120px",
                height: "120px",
                margin: "0 auto",
                borderRadius: "50%",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: clienteEditado.foto
                  ? `url(${clienteEditado.foto})`
                  : `url('https://cdn-icons-png.flaticon.com/512/847/847969.png')`,
                position: "relative",
              }}
            >
              <label htmlFor="editFileInputCliente" style={{ position: "absolute", bottom: "0", right: "0", cursor: "pointer" }}>
                <div
                  style={{
                    backgroundColor: "rgba(13, 110, 253, 0.8)",
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #ccc",
                  }}
                >
                  <i className="bi bi-camera-fill" style={{ color: "white", fontSize: "18px" }}></i>
                </div>
              </label>
            </div>
            <Form.Label style={{ marginTop: "10px" }}>Foto de perfil</Form.Label>
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label>Nombres</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-person" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="nombres"
                  value={clienteEditado.nombres}
                  onChange={handleEditInputChange}
                  placeholder="Nombres"
                  disabled
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Apellidos</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-person" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="apellidos"
                  value={clienteEditado.apellidos}
                  onChange={handleEditInputChange}
                  placeholder="Apellidos"
                  disabled
                />
              </InputGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Teléfono</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-telephone" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={clienteEditado.telefono}
                  onChange={handleEditInputChange}
                  placeholder="Teléfono"
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Dirección</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-geo-alt" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="direccion"
                  value={clienteEditado.direccion}
                  onChange={handleEditInputChange}
                  placeholder="Dirección"
                />
              </InputGroup>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-envelope" /></InputGroup.Text>
              <Form.Control
                type="email"
                name="correo"
                value={clienteEditado.correo || "No disponible"}
                disabled
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditCliente}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionCliente;
