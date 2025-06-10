import React, { useState, useEffect } from "react";
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
  // Expresiones Regulares y listas de control
  const palabrasInapropiadas = ["inapropiado", "ofensivo", "malo"];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const letrasEspaciosRegex = /^[A-Za-z\s]+$/;
  const telefonoRegex = /^\d{4}-\d{4}$/;
  const contraseñaRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const contraseñasComunes = ["123456", "password", "admin123", "contraseña"];

  // Estados de validación
  const [nombreValido, setNombreValido] = useState(false);
  const [apellidoValido, setApellidoValido] = useState(false);
  const [correoValido, setCorreoValido] = useState(false);
  const [telefonoValido, setTelefonoValido] = useState(false);
  const [direccionValida, setDireccionValida] = useState(false);
  const [contraseñaValida, setContraseñaValida] = useState(false);
  const [fotoValida, setFotoValida] = useState(false);

  const [formValidated, setFormValidated] = useState(false);

  // Funciones de validación
  const contienePalabrasInapropiadas = (valor) =>
    palabrasInapropiadas.some((palabra) =>
      valor.toLowerCase().includes(palabra)
    );

  const validarNombre = (valor) => {
    if (!valor) return "El nombre es obligatorio.";
    if (!letrasEspaciosRegex.test(valor))
      return "Solo se permiten letras y espacios.";
    if (contienePalabrasInapropiadas(valor))
      return "El nombre contiene palabras inapropiadas.";
    return "";
  };

  const validarApellido = (valor) => {
    if (!valor) return "El apellido es obligatorio.";
    if (!letrasEspaciosRegex.test(valor))
      return "Solo se permiten letras y espacios.";
    if (contienePalabrasInapropiadas(valor))
      return "El apellido contiene palabras inapropiadas.";
    return "";
  };

  const validarCorreo = (valor) => {
    if (!valor) return "El correo es obligatorio.";
    if (!emailRegex.test(valor))
      return "Debe tener un formato válido (usuario@dominio.com).";
    return "";
  };

  const validarTelefono = (valor) => {
    if (!valor) return "El teléfono es obligatorio.";
    if (!telefonoRegex.test(valor)) return "Debe seguir el formato 0000-0000.";
    return "";
  };

  const validarDireccion = (valor) => {
    if (!valor) return "La dirección es obligatoria.";
    if (contienePalabrasInapropiadas(valor))
      return "La dirección contiene palabras inapropiadas.";
    return "";
  };

  const validarContraseña = (valor) => {
    if (!valor) return "La contraseña es obligatoria.";
    if (contraseñasComunes.includes(valor))
      return "La contraseña es demasiado común.";
    if (!contraseñaRegex.test(valor))
      return "Debe tener al menos 8 caracteres, mayúsculas, minúsculas, números y símbolos.";
    return "";
  };

  const validarFoto = (valor) => {
    if (!valor) return "La foto de perfil es obligatoria.";
    return "";
  };

  // Validación general
  const isFormValid = () => {
    return (
      validarNombre(nuevoCliente.nombres) === "" &&
      validarApellido(nuevoCliente.apellidos) === "" &&
      validarCorreo(nuevoUsuario.correo) === "" &&
      validarTelefono(nuevoCliente.telefono) === "" &&
      validarDireccion(nuevoCliente.direccion) === "" &&
      validarContraseña(nuevoUsuario.contraseña) === "" &&
      validarFoto(nuevoCliente.foto) === ""
    );
  };

  // Actualización de estados de validación
  useEffect(() => {
    setNombreValido(validarNombre(nuevoCliente.nombres) === "");
    setApellidoValido(validarApellido(nuevoCliente.apellidos) === "");
    setCorreoValido(validarCorreo(nuevoUsuario.correo) === "");
    setTelefonoValido(validarTelefono(nuevoCliente.telefono) === "");
    setDireccionValida(validarDireccion(nuevoCliente.direccion) === "");
    setContraseñaValida(validarContraseña(nuevoUsuario.contraseña) === "");
    setFotoValida(validarFoto(nuevoCliente.foto) === "");
  }, [nuevoCliente, nuevoUsuario]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Imagen de perfil */}
          <Form.Group
            className="mb-3 text-center"
            style={{ position: "relative" }}
          >
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
              <label
                htmlFor="fileInputCliente"
                style={{ position: "absolute", bottom: "0", right: "0", cursor: "pointer" }}
              >
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
                  <i
                    className="bi bi-camera-fill"
                    style={{ color: "white", fontSize: "18px" }}
                  ></i>
                </div>
              </label>
            </div>
            {formValidated && validarFoto(nuevoCliente.foto) && (
              <div className="text-danger">{validarFoto(nuevoCliente.foto)}</div>
            )}
            <Form.Label style={{ marginTop: "10px" }}>Foto de perfil</Form.Label>
          </Form.Group>

          {/* Campos del cliente */}
          <Row className="mb-3">
            <Col>
              <Form.Label>Nombres</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-person" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="nombres"
                  value={nuevoCliente.nombres}
                  onChange={handleInputChange}
                  placeholder="Ingresa el nombre"
                  isInvalid={formValidated && !!validarNombre(nuevoCliente.nombres)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarNombre(nuevoCliente.nombres)}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Apellidos</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-person" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="apellidos"
                  value={nuevoCliente.apellidos}
                  onChange={handleInputChange}
                  placeholder="Ingresa los apellidos"
                  isInvalid={formValidated && !!validarApellido(nuevoCliente.apellidos)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarApellido(nuevoCliente.apellidos)}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Teléfono</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-telephone" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={nuevoCliente.telefono}
                  onChange={handleInputChange}
                  placeholder="Ingrese el teléfono"
                  isInvalid={formValidated && !!validarTelefono(nuevoCliente.telefono)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarTelefono(nuevoCliente.telefono)}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Dirección</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-geo-alt" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="direccion"
                  value={nuevoCliente.direccion}
                  onChange={handleInputChange}
                  placeholder="Ingresa la dirección"
                  isInvalid={formValidated && !!validarDireccion(nuevoCliente.direccion)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarDireccion(nuevoCliente.direccion)}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Correo</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-envelope" />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="correo"
                  value={nuevoUsuario.correo}
                  onChange={handleInputChange}
                  placeholder="Ingresa el correo"
                  isInvalid={formValidated && !!validarCorreo(nuevoUsuario.correo)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarCorreo(nuevoUsuario.correo)}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-lock" />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="contraseña"
                  value={nuevoUsuario.contraseña}
                  onChange={handleInputChange}
                  placeholder="Ingresa la contraseña"
                  isInvalid={formValidated && !!validarContraseña(nuevoUsuario.contraseña)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarContraseña(nuevoUsuario.contraseña)}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Row>
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
              handleAddCliente();
            }
          }}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroCliente;
