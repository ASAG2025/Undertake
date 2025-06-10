import React, { useState, useEffect } from "react";
import { Modal, Form, Button, InputGroup, Row, Col } from "react-bootstrap";

const RegistroNegocio = ({
  showModal,
  setShowModal,
  nuevoNegocio,
  handleInputChange,
  handleAddNegocio,
  handleLogoChange,
  categorias,
}) => {
  // Expresiones Regulares y listas de control
  const palabrasInapropiadas = ["inapropiado", "ofensivo", "malo"];
  const letrasEspaciosRegex = /^[A-Za-z\s]+$/;

  // Estados de validación individuales
  const [nombreValido, setNombreValido] = useState(false);
  const [categoriaValida, setCategoriaValida] = useState(false);
  const [descripcionValida, setDescripcionValida] = useState(false);
  const [ubicacionValida, setUbicacionValida] = useState(false);
  const [logoValido, setLogoValido] = useState(false);

  const [formValidated, setFormValidated] = useState(false);

  // Validaciones personalizadas
  const contienePalabrasInapropiadas = (valor) =>
    palabrasInapropiadas.some((palabra) =>
      valor.toLowerCase().includes(palabra)
    );

  const validarNombreNegocio = (valor) => {
    if (!valor) return "El nombre del negocio es obligatorio.";
    if (!letrasEspaciosRegex.test(valor))
      return "Solo se permiten letras y espacios en el nombre.";
    if (contienePalabrasInapropiadas(valor))
      return "El nombre contiene palabras inapropiadas.";
    if (valor.length < 3) return "El nombre debe tener al menos 3 caracteres.";
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
    if (valor.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    return "";
  };

  const validarUbicacion = (valor) => {
    if (!valor) return "La ubicación es obligatoria.";
    if (contienePalabrasInapropiadas(valor))
      return "La ubicación contiene palabras inapropiadas.";
    if (valor.length < 5) return "La ubicación debe tener al menos 5 caracteres.";
    return "";
  };

  const validarLogo = (valor) => {
    if (!valor) return "El logo del negocio es obligatorio.";
    return "";
  };

  // Validación general
  const isFormValid = () => {
    return (
      validarNombreNegocio(nuevoNegocio.nombre_negocio) === "" &&
      validarCategoria(nuevoNegocio.categoria) === "" &&
      validarDescripcion(nuevoNegocio.descripcion) === "" &&
      validarUbicacion(nuevoNegocio.ubicacion) === "" &&
      validarLogo(nuevoNegocio.logo) === ""
    );
  };

  // Actualiza estados booleanos en cada render
  useEffect(() => {
    setNombreValido(validarNombreNegocio(nuevoNegocio.nombre_negocio) === "");
    setCategoriaValida(validarCategoria(nuevoNegocio.categoria) === "");
    setDescripcionValida(validarDescripcion(nuevoNegocio.descripcion) === "");
    setUbicacionValida(validarUbicacion(nuevoNegocio.ubicacion) === "");
    setLogoValido(validarLogo(nuevoNegocio.logo) === "");
  }, [nuevoNegocio]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Negocio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            className="mb-4 text-center"
            style={{ position: "relative" }}
          >
            <Form.Control
              id="logoInputRegistro"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="logoInputRegistro"
              style={{
                cursor: "pointer",
                display: "inline-block",
                position: "relative",
              }}
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
                  backgroundImage: nuevoNegocio.logo
                    ? `url(${nuevoNegocio.logo})`
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
                <i
                  className="bi bi-upload"
                  style={{ color: "white", fontSize: "14px" }}
                ></i>
              </div>
            </label>
            <Form.Label className="d-block mb-2">Logo del Negocio</Form.Label>
            {formValidated && validarLogo(nuevoNegocio.logo) && (
              <div className="text-danger">{validarLogo(nuevoNegocio.logo)}</div>
            )}
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
              {formValidated && validarNombreNegocio(nuevoNegocio.nombre_negocio) && (
                <div className="text-danger">
                  {validarNombreNegocio(nuevoNegocio.nombre_negocio)}
                </div>
              )}
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
              {formValidated && validarCategoria(nuevoNegocio.categoria) && (
                <div className="text-danger">{validarCategoria(nuevoNegocio.categoria)}</div>
              )}
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
            {formValidated && validarDescripcion(nuevoNegocio.descripcion) && (
              <div className="text-danger">{validarDescripcion(nuevoNegocio.descripcion)}</div>
            )}
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
            {formValidated && validarUbicacion(nuevoNegocio.ubicacion) && (
              <div className="text-danger">{validarUbicacion(nuevoNegocio.ubicacion)}</div>
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
              handleAddNegocio();
            }
          }}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroNegocio;
