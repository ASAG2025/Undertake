import React from "react";
import { Modal, Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const EdicionEmprendedor = ({
  showEditModal,
  setShowEditModal,
  emprendedorEditado,
  handleEditInputChange,
  handleEditEmprendedor,
  handleEditImageChange,
}) => {
  if (!emprendedorEditado) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Emprendedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Imagen de perfil */}
          <Form.Group className="mb-3 text-center" style={{ position: "relative" }}>
            <Form.Control
              id="editFileInput"
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
                backgroundImage: emprendedorEditado.foto
                  ? `url(${emprendedorEditado.foto})`
                  : `url('https://cdn-icons-png.flaticon.com/512/847/847969.png')`,
                position: "relative",
              }}
            >
              <label htmlFor="editFileInput" style={{ position: "absolute", bottom: "0", right: "0", cursor: "pointer" }}>
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

          {/* Nombres y Apellidos */}
          <Row className="mb-3">
            <Col>
              <Form.Label>Nombres</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-person" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="nombres"
                  value={emprendedorEditado.nombres}
                  onChange={handleEditInputChange}
                  placeholder="Ingresa los nombres"
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
                  value={emprendedorEditado.apellidos}
                  onChange={handleEditInputChange}
                  placeholder="Ingresa los apellidos"
                  disabled
                />
              </InputGroup>
            </Col>
          </Row>

          {/* Cédula y Género */}
          <Row className="mb-3">
            <Col>
              <Form.Label>Cédula</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-card-text" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="cedula"
                  value={emprendedorEditado.cedula}
                  onChange={handleEditInputChange}
                  placeholder="Ingresa la cédula"
                  disabled
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Género</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-gender-ambiguous" /></InputGroup.Text>
                <Form.Select
                  name="genero"
                  value={emprendedorEditado.genero}
                  onChange={handleEditInputChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  disabled
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>

          {/* Teléfono y Dirección */}
          <Row className="mb-3">
            <Col>
              <Form.Label>Teléfono</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-telephone" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={emprendedorEditado.telefono}
                  onChange={handleEditInputChange}
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
                  value={emprendedorEditado.direccion}
                  onChange={handleEditInputChange}
                  placeholder="Ingresa la dirección"
                />
              </InputGroup>
            </Col>
          </Row>

          {/* Correo */}
          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-envelope" /></InputGroup.Text>
              <Form.Control
                type="email"
                name="correo"
                value={emprendedorEditado.correo || "No disponible"}
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
        <Button variant="primary" onClick={handleEditEmprendedor}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionEmprendedor;
