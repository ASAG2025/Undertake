import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

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

  const [errors, setErrors] = useState({
    Nombre_Programa: "",
    Monto_Maximo: "",
    Interes: "",
    Fecha_Inicio: "",
    Fecha_Fin: "",
    Descripcion: "",
    Imagen: "",
  });

  useEffect(() => {
    if (modoEdicion && programa) {
      setFormData({
        Nombre_Programa: programa.Nombre_Programa || "",
        Monto_Maximo: programa.Monto_Maximo ? programa.Monto_Maximo.toString() : "",
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
      setErrors({
        Nombre_Programa: "",
        Monto_Maximo: "",
        Interes: "",
        Fecha_Inicio: "",
        Fecha_Fin: "",
        Descripcion: "",
        Imagen: "",
      });
    }
  }, [modoEdicion, programa, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          Imagen: reader.result,
        });
      }
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

    const idPrograma = programa && programa.id ? programa.id : null;
    const programaConMonto = {
      ...formData,
      Monto_Maximo: parseFloat(formData.Monto_Maximo),
    };

    if (modoEdicion) {
      onGuardar(idPrograma, programaConMonto);
    } else {
      onGuardar(programaConMonto);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{modoEdicion ? "Editar Programa" : "Nuevo Programa"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Campos de formulario */}
          {/* ... mismos campos que ya tenías ... */}

          <Form.Group controlId="formNombrePrograma">
            <Form.Label>Nombre del Programa</Form.Label>
            <Form.Control
              type="text"
              name="Nombre_Programa"
              value={formData.Nombre_Programa}
              onChange={handleChange}
              isInvalid={!!errors.Nombre_Programa}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.Nombre_Programa}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formMontoMaximo">
            <Form.Label>Monto Máximo</Form.Label>
            <div className="input-group mb-3">
              <span className="input-group-text">C$</span>
              <Form.Control
                name="Monto_Maximo"
                value={formData.Monto_Maximo}
                onChange={handleChange}
                isInvalid={!!errors.Monto_Maximo}
                required
              />
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.Monto_Maximo}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formInteres">
            <Form.Label>Interés</Form.Label>
            <div className="input-group mb-3">
              <Form.Control
                type="number"
                name="Interes"
                value={formData.Interes}
                onChange={handleChange}
                isInvalid={!!errors.Interes}
                required
              />
              <span className="input-group-text">%</span>
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.Interes}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formFechaInicio">
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control
              type="date"
              name="Fecha_Inicio"
              value={formData.Fecha_Inicio}
              onChange={handleChange}
              isInvalid={!!errors.Fecha_Inicio}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.Fecha_Inicio}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formFechaFin">
            <Form.Label>Fecha de Fin</Form.Label>
            <Form.Control
              type="date"
              name="Fecha_Fin"
              value={formData.Fecha_Fin}
              onChange={handleChange}
              isInvalid={!!errors.Fecha_Fin}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.Fecha_Fin}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formImagen">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              isInvalid={!!errors.Imagen}
              required={!modoEdicion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Imagen}
            </Form.Control.Feedback>
          </Form.Group>


          <Modal.Footer>
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