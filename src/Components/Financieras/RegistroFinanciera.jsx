import React, { useState, useEffect } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";

const RegistroFinanciera = ({
  showModal,
  setShowModal,
  nuevaFinanciera,
  handleInputChange,
  handleFileChange,
  handleAddFinanciera,
}) => {
  // Lista de palabras inapropiadas para validar
  const palabrasInapropiadas = ["inapropiado", "ofensivo", "malo"];

  // Expresión regular para teléfono: exactamente 8 dígitos
  const telefonoRegex = /^\d{8}$/;

  // Estados booleanos de validación
  const [nombreValido, setNombreValido] = useState(false);
  const [direccionValida, setDireccionValida] = useState(false);
  const [contactoValido, setContactoValido] = useState(false);
  const [imagenValida, setImagenValida] = useState(false);

  // Estado para mostrar mensajes de error en texto
  const [formValidated, setFormValidated] = useState(false);

  // Función para detectar palabras inapropiadas
  const contienePalabrasInapropiadas = (valor) =>
    palabrasInapropiadas.some((palabra) =>
      valor.toLowerCase().includes(palabra)
    );

  // Validaciones individuales (retornan string con error o vacío)
  const validarNombre = (valor) => {
    if (!valor.trim()) return "El nombre de la institución es obligatorio.";
    if (contienePalabrasInapropiadas(valor))
      return "El nombre contiene palabras inapropiadas.";
    return "";
  };

  const validarDireccion = (valor) => {
    if (!valor.trim()) return "La dirección es obligatoria.";
    if (contienePalabrasInapropiadas(valor))
      return "La dirección contiene palabras inapropiadas.";
    return "";
  };

  const validarContacto = (valor) => {
    if (!valor.trim()) return "El contacto es obligatorio.";
    if (!telefonoRegex.test(valor))
      return "El contacto debe ser un número válido de 8 dígitos.";
    return "";
  };

  const validarImagen = (valor) => {
    if (!valor) return "La imagen es obligatoria.";
    return "";
  };

  // Función que valida todo el formulario
  const isFormValid = () => {
    return (
      validarNombre(nuevaFinanciera.Nombre_Institucion) === "" &&
      validarDireccion(nuevaFinanciera.Direccion) === "" &&
      validarContacto(nuevaFinanciera.Contacto) === "" &&
      validarImagen(nuevaFinanciera.Imagen) === ""
    );
  };

  // Actualizar estados booleanos en cada render o cambio en nuevaFinanciera
  useEffect(() => {
    setNombreValido(validarNombre(nuevaFinanciera.Nombre_Institucion) === "");
    setDireccionValida(validarDireccion(nuevaFinanciera.Direccion) === "");
    setContactoValido(validarContacto(nuevaFinanciera.Contacto) === "");
    setImagenValida(validarImagen(nuevaFinanciera.Imagen) === "");
  }, [nuevaFinanciera]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Institución Financiera</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Logo con overlay de cámara */}
          <Form.Group className="mb-3 text-center" style={{ position: "relative" }}>
            <Form.Control
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
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
                backgroundImage: nuevaFinanciera.Imagen
                  ? `url(${nuevaFinanciera.Imagen})`
                  : `url('https://cdn-icons-png.flaticon.com/512/3595/3595455.png')`,
                position: "relative",
              }}
            >
              <label
                htmlFor="fileInput"
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
                  <i className="bi bi-upload" style={{ color: "white", fontSize: "18px" }}></i>
                </div>
              </label>
            </div>
            <Form.Label style={{ marginTop: "10px" }}>Logo Institución</Form.Label>
            {formValidated && !imagenValida && (
              <div className="text-danger">{validarImagen(nuevaFinanciera.Imagen)}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre Institución</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-bank" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="Nombre_Institucion"
                value={nuevaFinanciera.Nombre_Institucion}
                onChange={handleInputChange}
                placeholder="Ingresa el nombre de la institución"
              />
            </InputGroup>
            {formValidated && !nombreValido && (
              <div className="text-danger">{validarNombre(nuevaFinanciera.Nombre_Institucion)}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-geo-alt" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="Direccion"
                value={nuevaFinanciera.Direccion}
                onChange={handleInputChange}
                placeholder="Ingresa la dirección"
              />
            </InputGroup>
            {formValidated && !direccionValida && (
              <div className="text-danger">{validarDireccion(nuevaFinanciera.Direccion)}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contacto</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-telephone" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="Contacto"
                value={nuevaFinanciera.Contacto}
                onChange={handleInputChange}
                placeholder="Ingresa el número de contacto"
              />
            </InputGroup>
            {formValidated && !contactoValido && (
              <div className="text-danger">{validarContacto(nuevaFinanciera.Contacto)}</div>
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
              handleAddFinanciera();
            }
          }}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroFinanciera;
