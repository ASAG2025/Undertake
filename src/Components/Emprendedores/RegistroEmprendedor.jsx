import React from "react";
import { Modal, Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const RegistroEmprendedor = ({
  showModal,
  setShowModal,
  nuevoEmprendedor,
  handleInputChange,
  handleImageChange,
  handleAddEmprendedor,
  nuevoUsuario,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}   >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Emprendedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Datos del emprendedor */}
          <Form.Group className="mb-3 text-center" style={{ position: "relative" }}>
              {/* Input oculto para seleccionar archivo */}
              <Form.Control
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              {/* Avatar con overlay de cámara */}
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  margin: "0 auto",
                  borderRadius: "50%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: nuevoEmprendedor.foto
                    ? `url(${nuevoEmprendedor.foto})`
                    : `url('https://cdn-icons-png.flaticon.com/512/847/847969.png')`,
                  position: "relative",
                }}
              >
              {/* Botón de cámara en esquina inferior derecha */}
              <label htmlFor="fileInput" style={{ position: "absolute", bottom: "0", right: "0", cursor: "pointer" }}>
                <div
                  style={{
                    backgroundColor: "rgba(13, 110, 253)",
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #ccc", // Gris claro
                    
                  }}
                >
                  <i className="bi bi-camera-fill" style={{ color: "white", fontSize: "18px" }}></i>
                </div>
              </label>
            </div>
            <Form.Label style={{ marginTop: "10px" }}>Foto de perfil</Form.Label>
          </Form.Group>

          {/* Campos en pares con íconos dentro */}
          <Row className="mb-3">
            <Col>
              <Form.Label>Nombres</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-person" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="nombres"
                  value={nuevoEmprendedor.nombres}
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
                  value={nuevoEmprendedor.apellidos}
                  onChange={handleInputChange}
                  placeholder="Ingresa los apellidos"
                />
              </InputGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Cédula</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-card-text" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="cedula"
                  value={nuevoEmprendedor.cedula}
                  onChange={handleInputChange}
                  placeholder="Ingresa la cédula"
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Género</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-gender-ambiguous" /></InputGroup.Text>
                <Form.Select
                  name="genero"
                  value={nuevoEmprendedor.genero}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Teléfono</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-telephone" /></InputGroup.Text>
                <Form.Control
                  type="numeric"
                  name="telefono"
                  value={nuevoEmprendedor.telefono}
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
                  value={nuevoEmprendedor.direccion}
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
        <Button variant="primary" onClick={handleAddEmprendedor}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroEmprendedor;
