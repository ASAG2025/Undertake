import React from "react";
import { Modal, Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const RegistroCliente = ({
  showModal,
  setShowModal,
  nuevoCliente,
  handleInputChange,
  handleImageChange,
  handleAddCliente,
  nuevoUsuario,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Imagen de perfil */}
          <Form.Group className="mb-3 text-center" style={{ position: "relative" }}>
            <Form.Control
              id="fileInputCliente"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
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
                backgroundImage: nuevoCliente.foto
                  ? `url(${nuevoCliente.foto})`
                  : `url('https://cdn-icons-png.flaticon.com/512/847/847969.png')`,
                position: "relative",
              }}
            >
              <label htmlFor="fileInputCliente" style={{ position: "absolute", bottom: "0", right: "0", cursor: "pointer" }}>
                <div
                  style={{
                    backgroundColor: "rgba(13, 110, 253)",
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

          {/* Campos del cliente */}
          <Row className="mb-3">
            <Col>
              <Form.Label>Nombres</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-person" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="nombres"
                  value={nuevoCliente.nombres}
                  onChange={handleInputChange}
                  placeholder="Ingresa el nombre"
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
                  value={nuevoCliente.apellidos}
                  onChange={handleInputChange}
                  placeholder="Ingresa los apellidos"
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
                  value={nuevoCliente.telefono}
                  onChange={handleInputChange}
                  placeholder="Ingresa el teléfono"
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
                  value={nuevoCliente.direccion}
                  onChange={handleInputChange}
                  placeholder="Ingresa la dirección"
                />
              </InputGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Correo</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-envelope" /></InputGroup.Text>
                <Form.Control
                  type="email"
                  name="correo"
                  value={nuevoUsuario.correo}
                  onChange={handleInputChange}
                  placeholder="Ingresa el correo"
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-lock" /></InputGroup.Text>
                <Form.Control
                  type="password"
                  name="contraseña"
                  value={nuevoUsuario.contraseña}
                  onChange={handleInputChange}
                  placeholder="Ingresa la contraseña"
                />
              </InputGroup>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddCliente}>
            Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroCliente;
