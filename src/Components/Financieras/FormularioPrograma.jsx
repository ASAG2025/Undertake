import React, { useState, useEffect } from "react";
import { Modal, Form, Button, InputGroup, Row, Col } from "react-bootstrap";

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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (modoEdicion && programa) {
      setFormData({
        Nombre_Programa: programa.Nombre_Programa || "",
        Monto_Maximo: programa.Monto_Maximo?.toString() || "",
        Interes: programa.Interes || "",
        Fecha_Inicio: programa.Fecha_Inicio || "",
        Fecha_Fin: programa.Fecha_Fin || "",
        Descripcion: programa.Descripcion || "",
        Imagen: null,
      });
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
      setErrors({});
    }
  }, [modoEdicion, programa, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, Imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.Nombre_Programa) newErrors.Nombre_Programa = "El nombre del programa es obligatorio.";
    if (!formData.Monto_Maximo) newErrors.Monto_Maximo = "El monto máximo es obligatorio.";
    if (!formData.Interes) newErrors.Interes = "El interés es obligatorio.";
    if (!formData.Fecha_Inicio) newErrors.Fecha_Inicio = "La fecha de inicio es obligatoria.";
    if (!formData.Fecha_Fin) newErrors.Fecha_Fin = "La fecha de fin es obligatoria.";
    if (!formData.Descripcion) newErrors.Descripcion = "La descripción es obligatoria.";
    if (!formData.Imagen && !modoEdicion) newErrors.Imagen = "La imagen es obligatoria.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const idPrograma = programa?.id || null;
    const programaFinal = {
      ...formData,
      Monto_Maximo: parseFloat(formData.Monto_Maximo),
    };

    modoEdicion ? onGuardar(idPrograma, programaFinal) : onGuardar(programaFinal);
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
            <label htmlFor="imagenProgramaInput" style={{ cursor: "pointer", position: "relative" }}>
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
            <Form.Label className="d-block mb-2">Imagen del Programa</Form.Label>
            {errors.Imagen && (
              <Form.Text className="text-danger d-block">{errors.Imagen}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre del Programa</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-bullseye" /></InputGroup.Text>
              <Form.Control
                name="Nombre_Programa"
                value={formData.Nombre_Programa}
                onChange={handleChange}
                isInvalid={!!errors.Nombre_Programa}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {errors.Nombre_Programa}
            </Form.Control.Feedback>
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
                  isInvalid={!!errors.Monto_Maximo}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.Monto_Maximo}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Interés</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="Interes"
                  value={formData.Interes}
                  onChange={handleChange}
                  isInvalid={!!errors.Interes}
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.Interes}
              </Form.Control.Feedback>
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
                isInvalid={!!errors.Fecha_Inicio}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Fecha_Inicio}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Fecha de Fin</Form.Label>
              <Form.Control
                type="date"
                name="Fecha_Fin"
                value={formData.Fecha_Fin}
                onChange={handleChange}
                isInvalid={!!errors.Fecha_Fin}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Fecha_Fin}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-card-text" /></InputGroup.Text>
              <Form.Control
                as="textarea"
                rows={3}
                name="Descripcion"
                value={formData.Descripcion}
                onChange={handleChange}
                isInvalid={!!errors.Descripcion}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {errors.Descripcion}
            </Form.Control.Feedback>
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
