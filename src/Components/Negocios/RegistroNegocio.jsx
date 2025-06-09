import React from "react";
import { Modal, Form, Button, InputGroup, Row, Col } from "react-bootstrap";

const RegistroNegocio = ({
  showModal,
  setShowModal,
  nuevoNegocio,
  handleInputChange,
  handleAddNegocio,
  handleLogoChange,
  categorias
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Negocio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-4 text-center" style={{ position: "relative" }}>

              {/* Input oculto */}
              <Form.Control
                id="logoInputRegistro"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                style={{ display: "none" }}
              />

              {/* Imagen redonda clickeable */}
              <label htmlFor="logoInputRegistro" style={{ cursor: "pointer", display: "inline-block", position: "relative" }}>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto",
                    borderRadius: "50%",
                    border: "2px solid #ccc",
                    backgroundColor: "#f8f9fa",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: nuevoNegocio.logo
                      ? `url(${nuevoNegocio.logo})`
                      : `url('https://cdn-icons-png.flaticon.com/512/3595/3595455.png')`,
                  }}
                />

                {/* Ícono de carga pequeño */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "calc(50% - 45px)",
                    backgroundColor: "#0d6efd",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid white",
                  }}
                >
                  <i className="bi bi-upload" style={{ color: "white", fontSize: "14px" }}></i>
                </div>
              </label>
              <Form.Label className="d-block mb-2">Logo del Negocio</Form.Label>
            </Form.Group>


           <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Nombre del Negocio</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-shop" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="nombre_negocio"
                  value={nuevoNegocio.nombre_negocio}
                  onChange={handleInputChange}
                  placeholder="Ingresa el nombre del negocio"
                />
              </InputGroup>
            </Col>

            <Col md={6}>
              <Form.Label>Categoría</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-tags" />
                </InputGroup.Text>
                <Form.Select
                  name="categoria"
                  value={nuevoNegocio.categoria}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.nombre}>
                      {cat.nombre}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>


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
                value={nuevoNegocio.descripcion}
                onChange={handleInputChange}
                placeholder="Ingresa la descripción"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-geo-alt" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="ubicacion"
                value={nuevoNegocio.ubicacion}
                onChange={handleInputChange}
                placeholder="Dirección del negocio"
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddNegocio}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroNegocio;
