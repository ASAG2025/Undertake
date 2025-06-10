import React, { useState, useEffect } from "react";
import { Modal, Form, Button, InputGroup, Row, Col } from "react-bootstrap";

const RegistroProducto = ({
  showModal,
  setShowModal,
  nuevoProducto,
  handleInputChange,
  handleImageChange,
  handleAddProducto,
  categorias,
}) => {
  // Expresiones Regulares y listas de control
  const palabrasInapropiadas = ["inapropiado", "ofensivo", "malo"];

  // Estados de validación individuales
  const [nombreValido, setNombreValido] = useState(false);
  const [precioValido, setPrecioValido] = useState(false);
  const [cantidadValida, setCantidadValida] = useState(false);
  const [categoriaValida, setCategoriaValida] = useState(false);
  const [descripcionValida, setDescripcionValida] = useState(false);
  const [imagenValida, setImagenValida] = useState(false);

  const [formValidated, setFormValidated] = useState(false);

  // Función para detectar palabras inapropiadas
  const contienePalabrasInapropiadas = (valor) =>
    palabrasInapropiadas.some((palabra) =>
      valor.toLowerCase().includes(palabra)
    );

  // Validaciones personalizadas
  const validarNombre = (valor) => {
    if (!valor) return "El nombre es obligatorio.";
    if (contienePalabrasInapropiadas(valor))
      return "El nombre contiene palabras inapropiadas.";
    if (valor.length < 3) return "El nombre debe tener al menos 3 caracteres.";
    return "";
  };

  const validarPrecio = (valor) => {
    if (valor === "" || valor === null) return "El precio es obligatorio.";
    if (isNaN(valor) || Number(valor) <= 0)
      return "El precio debe ser un número positivo.";
    return "";
  };

  const validarCantidad = (valor) => {
    if (valor === "" || valor === null) return "La cantidad es obligatoria.";
    if (!Number.isInteger(Number(valor)) || Number(valor) < 0)
      return "La cantidad debe ser un número entero mayor o igual a 0.";
    return "";
  };

  const validarCategoria = (valor) => {
    if (!valor) return "Por favor, selecciona una categoría.";
    return "";
  };

  const validarDescripcion = (valor) => {
    if (!valor) return "La descripción es obligatoria.";
    if (contienePalabrasInapropiadas(valor))
      return "La descripción contiene palabras inapropiadas.";
    if (valor.length < 10) return "La descripción debe tener al menos 10 caracteres.";
    return "";
  };

  const validarImagen = (valor) => {
    if (!valor) return "La imagen es obligatoria.";
    return "";
  };

  // Validación general
  const isFormValid = () => {
    return (
      validarNombre(nuevoProducto.nombre) === "" &&
      validarPrecio(nuevoProducto.precio) === "" &&
      validarCantidad(nuevoProducto.cantidad) === "" &&
      validarCategoria(nuevoProducto.categoria) === "" &&
      validarDescripcion(nuevoProducto.descripcion) === "" &&
      validarImagen(nuevoProducto.imagen) === ""
    );
  };

  // Actualización de flags de validación en cada render
  useEffect(() => {
    setNombreValido(validarNombre(nuevoProducto.nombre) === "");
    setPrecioValido(validarPrecio(nuevoProducto.precio) === "");
    setCantidadValida(validarCantidad(nuevoProducto.cantidad) === "");
    setCategoriaValida(validarCategoria(nuevoProducto.categoria) === "");
    setDescripcionValida(validarDescripcion(nuevoProducto.descripcion) === "");
    setImagenValida(validarImagen(nuevoProducto.imagen) === "");
  }, [nuevoProducto]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Imagen del producto */}
          <Form.Group className="mb-3 text-center" style={{ position: "relative" }}>
            <Form.Control
              id="productoInputImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
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
            {formValidated && validarImagen(nuevoProducto.imagen) && (
              <div className="text-danger">{validarImagen(nuevoProducto.imagen)}</div>
            )}
          </Form.Group>

          {/* Nombre */}
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
            {formValidated && validarNombre(nuevoProducto.nombre) && (
              <div className="text-danger">{validarNombre(nuevoProducto.nombre)}</div>
            )}
          </Form.Group>

          <Row className="mb-3">
            {/* Precio */}
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
              {formValidated && validarPrecio(nuevoProducto.precio) && (
                <div className="text-danger">{validarPrecio(nuevoProducto.precio)}</div>
              )}
            </Col>

            {/* Cantidad */}
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
              {formValidated && validarCantidad(nuevoProducto.cantidad) && (
                <div className="text-danger">{validarCantidad(nuevoProducto.cantidad)}</div>
              )}
            </Col>
          </Row>

          {/* Categoría */}
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
            {formValidated && validarCategoria(nuevoProducto.categoria) && (
              <div className="text-danger">{validarCategoria(nuevoProducto.categoria)}</div>
            )}
          </Form.Group>

          {/* Descripción */}
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
            {formValidated && validarDescripcion(nuevoProducto.descripcion) && (
              <div className="text-danger">{validarDescripcion(nuevoProducto.descripcion)}</div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setFormValidated(true);
            if (isFormValid()) {
              handleAddProducto();
            }
          }}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroProducto;
