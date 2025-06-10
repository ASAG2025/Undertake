import React, { useState, useEffect } from "react";
import { Modal, Form, Button, InputGroup, Row, Col } from "react-bootstrap";

const palabrasInapropiadas = ["inapropiado", "ofensivo", "malo"];

const contienePalabrasInapropiadas = (valor) =>
  palabrasInapropiadas.some((palabra) =>
    valor.toLowerCase().includes(palabra)
  );

const validarNombrePrograma = (valor) => {
  if (!valor.trim()) return "El nombre del programa es obligatorio.";
  if (contienePalabrasInapropiadas(valor))
    return "El nombre contiene palabras inapropiadas.";
  return "";
};

const validarMontoMaximo = (valor) => {
  if (!valor.trim()) return "El monto máximo es obligatorio.";
  if (isNaN(valor) || Number(valor) <= 0)
    return "El monto máximo debe ser un número positivo.";
  return "";
};

const validarInteres = (valor) => {
  if (!valor.trim()) return "El interés es obligatorio.";
  if (isNaN(valor) || Number(valor) < 0)
    return "El interés debe ser un número mayor o igual a cero.";
  return "";
};

const validarFechaInicio = (valor) => {
  if (!valor) return "La fecha de inicio es obligatoria.";
  return "";
};

const validarFechaFin = (inicio, fin) => {
  if (!fin) return "La fecha de fin es obligatoria.";
  if (inicio && fin && inicio > fin)
    return "La fecha de fin no puede ser anterior a la de inicio.";
  return "";
};

const validarDescripcion = (valor) => {
  if (!valor.trim()) return "La descripción es obligatoria.";
  if (contienePalabrasInapropiadas(valor))
    return "La descripción contiene palabras inapropiadas.";
  return "";
};

const validarImagen = (valor, modoEdicion) => {
  if (!valor && !modoEdicion) return "La imagen es obligatoria.";
  return "";
};

const FormularioPrograma = ({ show, onHide, onGuardar, modoEdicion, programa }) => {
  const [formData, setFormData] = useState({
    Nombre_Programa: "",
    Monto_Maximo: "",
    Interes: "",
    Fecha_Inicio: "",
    Fecha_Fin: "",
    Descripcion: "",
    Imagen: null,
  });

  // Estados booleanos para validez de cada campo
  const [nombreValido, setNombreValido] = useState(false);
  const [montoValido, setMontoValido] = useState(false);
  const [interesValido, setInteresValido] = useState(false);
  const [fechaInicioValida, setFechaInicioValida] = useState(false);
  const [fechaFinValida, setFechaFinValida] = useState(false);
  const [descripcionValida, setDescripcionValida] = useState(false);
  const [imagenValida, setImagenValida] = useState(false);

  // Estado para mostrar errores (solo al intentar guardar)
  const [formValidated, setFormValidated] = useState(false);

  useEffect(() => {
    if (modoEdicion && programa) {
      setFormData({
        Nombre_Programa: programa.Nombre_Programa || "",
        Monto_Maximo: programa.Monto_Maximo?.toString() || "",
        Interes: programa.Interes?.toString() || "",
        Fecha_Inicio: programa.Fecha_Inicio || "",
        Fecha_Fin: programa.Fecha_Fin || "",
        Descripcion: programa.Descripcion || "",
        Imagen: null,
      });
      setFormValidated(false);
    } else if (!modoEdicion && show) {
      setFormData({
        Nombre_Programa: "",
        Monto_Maximo: "",
        Interes: "",
        Fecha_Inicio: "",
        Fecha_Fin: "",
        Descripcion: "",
        Imagen: null,
      });
      setFormValidated(false);
    }
  }, [modoEdicion, programa, show]);

  // Actualizar validez de campos en cada cambio
  useEffect(() => {
    setNombreValido(validarNombrePrograma(formData.Nombre_Programa) === "");
    setMontoValido(validarMontoMaximo(formData.Monto_Maximo) === "");
    setInteresValido(validarInteres(formData.Interes) === "");
    setFechaInicioValida(validarFechaInicio(formData.Fecha_Inicio) === "");
    setFechaFinValida(validarFechaFin(formData.Fecha_Inicio, formData.Fecha_Fin) === "");
    setDescripcionValida(validarDescripcion(formData.Descripcion) === "");
    setImagenValida(validarImagen(formData.Imagen, modoEdicion) === "");
  }, [formData, modoEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormValidated(false); // reset para mostrar errores solo al guardar
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, Imagen: reader.result }));
        setFormValidated(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = () =>
    nombreValido &&
    montoValido &&
    interesValido &&
    fechaInicioValida &&
    fechaFinValida &&
    descripcionValida &&
    imagenValida;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValidated(true);

    if (isFormValid()) {
      const idPrograma = programa?.id || null;
      const programaFinal = {
        ...formData,
        Monto_Maximo: parseFloat(formData.Monto_Maximo),
        Interes: parseFloat(formData.Interes),
      };

      modoEdicion ? onGuardar(idPrograma, programaFinal) : onGuardar(programaFinal);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{modoEdicion ? "Editar Programa" : "Nuevo Programa"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Imagen circular con overlay */}
          <Form.Group className="mb-3 text-center" style={{ position: "relative" }}>
            <Form.Control
              id="imagenProgramaInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="imagenProgramaInput"
              style={{ cursor: "pointer", position: "relative" }}
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
                  backgroundImage: formData.Imagen
                    ? `url(${formData.Imagen})`
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
            {formValidated && !imagenValida && (
              <div className="text-danger mt-1">{validarImagen(formData.Imagen, modoEdicion)}</div>
            )}
            <Form.Label className="d-block mb-2">Imagen del Programa</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre del Programa</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-bullseye" />
              </InputGroup.Text>
              <Form.Control
                name="Nombre_Programa"
                value={formData.Nombre_Programa}
                onChange={handleChange}
                placeholder="Nombre del programa"
              />
            </InputGroup>
            {formValidated && !nombreValido && (
              <div className="text-danger mt-1">{validarNombrePrograma(formData.Nombre_Programa)}</div>
            )}
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Monto Máximo</Form.Label>
              <InputGroup>
                <InputGroup.Text>C$</InputGroup.Text>
                <Form.Control
                  name="Monto_Maximo"
                  value={formData.Monto_Maximo}
                  onChange={handleChange}
                  placeholder="Monto máximo"
                />
              </InputGroup>
              {formValidated && !montoValido && (
                <div className="text-danger mt-1">{validarMontoMaximo(formData.Monto_Maximo)}</div>
              )}
            </Col>
            <Col md={6}>
              <Form.Label>Interés</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="Interes"
                  value={formData.Interes}
                  onChange={handleChange}
                  placeholder="Interés"
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
              {formValidated && !interesValido && (
                <div className="text-danger mt-1">{validarInteres(formData.Interes)}</div>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control
                type="date"
                name="Fecha_Inicio"
                value={formData.Fecha_Inicio}
                onChange={handleChange}
              />
              {formValidated && !fechaInicioValida && (
                <div className="text-danger mt-1">{validarFechaInicio(formData.Fecha_Inicio)}</div>
              )}
            </Col>
            <Col md={6}>
              <Form.Label>Fecha de Fin</Form.Label>
              <Form.Control
                type="date"
                name="Fecha_Fin"
                value={formData.Fecha_Fin}
                onChange={handleChange}
              />
              {formValidated && !fechaFinValida && (
                <div className="text-danger mt-1">{validarFechaFin(formData.Fecha_Inicio, formData.Fecha_Fin)}</div>
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
                name="Descripcion"
                value={formData.Descripcion}
                onChange={handleChange}
                placeholder="Descripción del programa"
              />
            </InputGroup>
            {formValidated && !descripcionValida && (
              <div className="text-danger mt-1">{validarDescripcion(formData.Descripcion)}</div>
            )}
          </Form.Group>

          <Modal.Footer className="justify-content-center">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormularioPrograma;
