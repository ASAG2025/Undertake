import React, { useState, useEffect } from "react";
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
      // Expresiones Regulares y listas de control
      const palabrasInapropiadas = ["inapropiado", "ofensivo", "malo"];
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const letrasEspaciosRegex = /^[A-Za-z\s]+$/;
      const telefonoRegex = /^\d{4}-\d{4}$/;
      const cedulaRegex = /^\d{3}-\d{6}-\d{4}[A-Za-z]?$/;
      const contraseñaRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const contraseñasComunes = ["123456", "password", "admin123", "contraseña"];

      // Estados de validación individuales
      const [nombreValido, setNombreValido] = useState(false);
      const [apellidoValido, setApellidoValido] = useState(false);
      const [correoValido, setCorreoValido] = useState(false);
      const [telefonoValido, setTelefonoValido] = useState(false);
      const [cedulaValida, setCedulaValida] = useState(false);
      const [contraseñaValida, setContraseñaValida] = useState(false);
      const [generoValido, setGeneroValido] = useState(false);
      const [direccionValida, setDireccionValida] = useState(false);
      const [fotoValida, setFotoValida] = useState(false);

      const [formValidated, setFormValidated] = useState(false);

      // Funciones de validación personalizadas
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

      const validarCedula = (valor) => {
        if (!valor) return "La cédula es obligatoria.";
        if (!cedulaRegex.test(valor))
          return "Debe seguir el formato 000-000000-0000X.";
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

      const validarGenero = (valor) => {
        if (!valor) return "Por favor, selecciona un género.";
        return "";
      };

      const validarDireccion = (valor) => {
        if (!valor) return "La dirección es obligatoria.";
        if (contienePalabrasInapropiadas(valor))
          return "La dirección contiene palabras inapropiadas.";
        return "";
      };

      const validarFoto = (valor) => {
        if (!valor) return "La foto de perfil es obligatoria.";
        return "";
      };

      // Validación general de formulario
      const isFormValid = () => {
        return (
          validarNombre(nuevoEmprendedor.nombres) === "" &&
          validarApellido(nuevoEmprendedor.apellidos) === "" &&
          validarCorreo(nuevoUsuario.correo) === "" &&
          validarTelefono(nuevoEmprendedor.telefono) === "" &&
          validarCedula(nuevoEmprendedor.cedula) === "" &&
          validarContraseña(nuevoUsuario.contraseña) === "" &&
          validarGenero(nuevoEmprendedor.genero) === "" &&
          validarDireccion(nuevoEmprendedor.direccion) === "" &&
          validarFoto(nuevoEmprendedor.foto) === ""
        );
      };

      // Actualización de flags de validación en cada render
      useEffect(() => {
        setNombreValido(validarNombre(nuevoEmprendedor.nombres) === "");
        setApellidoValido(validarApellido(nuevoEmprendedor.apellidos) === "");
        setCorreoValido(validarCorreo(nuevoUsuario.correo) === "");
        setTelefonoValido(validarTelefono(nuevoEmprendedor.telefono) === "");
        setCedulaValida(validarCedula(nuevoEmprendedor.cedula) === "");
        setContraseñaValida(validarContraseña(nuevoUsuario.contraseña) === "");
        setGeneroValido(validarGenero(nuevoEmprendedor.genero) === "");
        setDireccionValida(validarDireccion(nuevoEmprendedor.direccion) === "");
        setFotoValida(validarFoto(nuevoEmprendedor.foto) === "");
      }, [nuevoEmprendedor, nuevoUsuario]);


  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Emprendedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Avatar */}
          <Form.Group className="mb-3 text-center" style={{ position: "relative" }}>
            <Form.Control
              id="fileInput"
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
                backgroundImage: nuevoEmprendedor.foto
                  ? `url(${nuevoEmprendedor.foto})`
                  : `url('https://cdn-icons-png.flaticon.com/512/847/847969.png')`,
                position: "relative",
              }}
            >
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
                    border: "2px solid #ccc",
                  }}
                >
                  <i className="bi bi-camera-fill" style={{ color: "white", fontSize: "18px" }}></i>
                </div>
              </label>
            </div>
            <Form.Label style={{ marginTop: "10px" }}>Foto de perfil</Form.Label>
            {formValidated && validarFoto(nuevoEmprendedor.foto) && (
              <div className="text-danger">{validarFoto(nuevoEmprendedor.foto)}</div>
            )}
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
                  value={nuevoEmprendedor.nombres}
                  onChange={handleInputChange}
                  placeholder="Ingresa el nombre"
                  isInvalid={formValidated && !!validarNombre(nuevoEmprendedor.nombres)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarNombre(nuevoEmprendedor.nombres)}
                </Form.Control.Feedback>
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
                  isInvalid={formValidated && !!validarApellido(nuevoEmprendedor.apellidos)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarApellido(nuevoEmprendedor.apellidos)}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Row>

          {/* Cedula y Genero */}
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
                  isInvalid={formValidated && !!validarCedula(nuevoEmprendedor.cedula)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarCedula(nuevoEmprendedor.cedula)}
                </Form.Control.Feedback>
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
              {formValidated && validarGenero(nuevoEmprendedor.genero) && (
                <div className="text-danger">{validarGenero(nuevoEmprendedor.genero)}</div>
              )}
            </Col>
          </Row>

          {/* Telefono y Direccion */}
          <Row className="mb-3">
            <Col>
              <Form.Label>Teléfono</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-telephone" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={nuevoEmprendedor.telefono}
                  onChange={handleInputChange}
                  placeholder="Ingrese el telefono"
                  isInvalid={formValidated && !!validarTelefono(nuevoEmprendedor.telefono)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarTelefono(nuevoEmprendedor.telefono)}
                </Form.Control.Feedback>
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
                  isInvalid={formValidated && !!validarDireccion(nuevoEmprendedor.direccion)}
                />
                <Form.Control.Feedback type="invalid">
                  {validarDireccion(nuevoEmprendedor.direccion)}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Row>

          {/* Correo y Contraseña */}
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
                <InputGroup.Text><i className="bi bi-lock" /></InputGroup.Text>
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
                handleAddEmprendedor();
              }
            }}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroEmprendedor;
