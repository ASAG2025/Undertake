import React from "react";
import { Modal, Form, Button, Image, InputGroup, Row, Col } from "react-bootstrap";

const EdicionNegocio = ({
  showEditModal,
  setShowEditModal,
  negocioEditado,
  handleEditInputChange,
  handleEditLogoChange,
  handleEditNegocio,
  categorias
}) => {
  if (!negocioEditado) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Negocio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-4 text-center" style={{ position: "relative" }}>
            <Form.Label className="d-block mb-2">Logo del Negocio</Form.Label>

            {/* Input oculto */}
            <Form.Control
              id="logoInput"
              type="file"
              accept="image/*"
              onChange={handleEditLogoChange}
              style={{ display: "none" }}
            />

                {/* Contenedor clickeable del logo redondo */}
                <label htmlFor="logoInput" style={{ cursor: "pointer", display: "inline-block", position: "relative" }}>
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
                      backgroundImage: negocioEditado.logo
                        ? `url(${negocioEditado.logo})`
                        : `url('https://cdn-icons-png.flaticon.com/512/3595/3595455.png')`,
                    }}
                  />

            {/* Ícono de carga pequeño */}
            <div
              style={{
                position: "absolute",
                bottom: "5px",
                right: "calc(50% - 45px)", // para alinear con imagen centrada
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
        </Form.Group>


          {/* Nombre del Negocio y Categoría en la misma línea */}
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
                  value={negocioEditado.nombre_negocio}
                  onChange={handleEditInputChange}
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
                  value={negocioEditado.categoria}
                  onChange={handleEditInputChange}
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

          {/* Descripción con icono */}
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
                value={negocioEditado.descripcion}
                onChange={handleEditInputChange}
              />
            </InputGroup>
          </Form.Group>

          {/* Ubicación con icono */}
          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-geo-alt" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="ubicacion"
                value={negocioEditado.ubicacion}
                onChange={handleEditInputChange}
              />
            </InputGroup>
          </Form.Group>

          {/* Propietario con icono */}
          <Form.Group className="mb-3">
            <Form.Label>Propietario</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-person" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={negocioEditado.nombres || "Desconocido"}
                readOnly
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
        <Button variant="primary" onClick={handleEditNegocio}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionNegocio;
