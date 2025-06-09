import React from "react";
import { Modal, Form, Button, InputGroup, Row, Col } from "react-bootstrap";

const RegistroProducto = ({
  showModal,
  setShowModal,
  nuevoProducto,
  handleInputChange,
  handleImageChange,
  handleAddProducto,
  categorias
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto</Modal.Title>
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
              onChange={handleImageChange}
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
                  backgroundImage: nuevoProducto.imagen
                    ? `url(${nuevoProducto.imagen})`
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
                value={nuevoProducto.nombre}
                onChange={handleInputChange}
              />
            </InputGroup>
          </Form.Group>

          <Row className="mb-3">
            {/* Precio del producto */}
            <Col md={6}>
              <Form.Label>Precio</Form.Label>
              <InputGroup>
                <InputGroup.Text>C$</InputGroup.Text>
                <Form.Control
                  type="number"
                  name="precio"
                  value={nuevoProducto.precio}
                  onChange={handleInputChange}
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
                  value={nuevoProducto.cantidad}
                  onChange={handleInputChange}
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
                value={nuevoProducto.categoria}
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
                value={nuevoProducto.descripcion}
                onChange={handleInputChange}
                placeholder="Ingresa la descripción"
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddProducto}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroProducto;
