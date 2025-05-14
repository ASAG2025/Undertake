import React from "react";
import { Modal, Form, Button, InputGroup, Row, Col, Image } from "react-bootstrap";

const EdicionProducto = ({
  showEditModal,
  setShowEditModal,
  productoEditado,
  handleEditInputChange,
  handleEditImageChange,
  handleEditProducto,
  categorias
}) => {
  if (!productoEditado) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Imagen del producto */}
          <Form.Group className="mb-3 text-center" style={{ position: "relative" }}>

            {/* Input oculto para cargar imagen */}
            <Form.Control
              id="productoInputImage"
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
              style={{ display: "none" }}
            />

            {/* Imagen redonda clickeable */}
            <label
              htmlFor="productoInputImage"
              style={{ cursor: "pointer", display: "inline-block", position: "relative" }}
            >
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
                  backgroundImage: productoEditado.imagen
                    ? `url(${productoEditado.imagen})`
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
            <Form.Label className="d-block mb-2">Imagen del Producto</Form.Label>
          </Form.Group>

          {/* Nombre del producto */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-box" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="nombre"
                value={productoEditado.nombre}
                onChange={handleEditInputChange}
              />
            </InputGroup>
          </Form.Group>

          <Row className="mb-3">
            {/* Precio del producto */}
            <Col md={6}>
              <Form.Label>Precio</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  name="precio"
                  value={productoEditado.precio}
                  onChange={handleEditInputChange}
                />
              </InputGroup>
            </Col>

            {/* Cantidad del producto */}
            <Col md={6}>
              <Form.Label>Cantidad</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-cash-coin" />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  name="cantidad"
                  value={productoEditado.cantidad}
                  onChange={handleEditInputChange}
                />
              </InputGroup>
            </Col>
          </Row>

          {/* Categoría del producto */}
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-tags" />
              </InputGroup.Text>
              <Form.Select
                name="categoria"
                value={productoEditado.categoria}
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
          </Form.Group>

          {/* Descripción del producto */}
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
                value={productoEditado.descripcion}
                onChange={handleEditInputChange}
                placeholder="Ingresa la descripción"
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditProducto}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionProducto;
