import React from "react";
import { Modal, Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const RegistroFinanciera = ({
  showModal,
  setShowModal,
  nuevaFinanciera,
  handleInputChange,
  handleFileChange,
  handleAddFinanciera,
}) => {
  const [errors, setErrors] = useState({
    Nombre_Institucion: "",
    Direccion: "",
    Contacto: "",
    Imagen: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validaciones
    if (!nuevaFinanciera.Nombre_Institucion.trim()) {
      newErrors.Nombre_Institucion = "El nombre de la institución es obligatorio.";
    }

    if (!nuevaFinanciera.Direccion.trim()) {
      newErrors.Direccion = "La dirección es obligatoria.";
    }

    // Validación del campo Contacto: solo acepta exactamente 8 dígitos
    const telefonoRegex = /^\d{8}$/; // Solo acepta exactamente 8 dígitos
    if (!nuevaFinanciera.Contacto.trim()) {
      newErrors.Contacto = "El contacto es obligatorio.";
    } else if (!telefonoRegex.test(nuevaFinanciera.Contacto)) {
      newErrors.Contacto = "El contacto debe ser un número de teléfono válido de 8 dígitos.";
    }

    if (!nuevaFinanciera.Imagen) {
      newErrors.Imagen = "La imagen es obligatoria.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Llamada a la función de agregar la financiera
    handleAddFinanciera();
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
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
                  <i className= "bi bi-upload" style={{ color: "white", fontSize: "18px" }}></i>
                </div>
              </label>
            </div>
            <Form.Label style={{ marginTop: "10px" }}>Logo Institución</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre Institución</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-bank" /></InputGroup.Text>
              <Form.Control
                type="text"
                name="Nombre_Institucion"
                value={nuevaFinanciera.Nombre_Institucion}
                onChange={handleInputChange}
                placeholder="Ingresa el nombre de la institución"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-geo-alt" /></InputGroup.Text>
              <Form.Control
                type="text"
                name="Direccion"
                value={nuevaFinanciera.Direccion}
                onChange={handleInputChange}
                placeholder="Ingresa la dirección"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contacto</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-telephone" /></InputGroup.Text>
              <Form.Control
                type="text"
                name="Contacto"
                value={nuevaFinanciera.Contacto}
                onChange={handleInputChange}
                placeholder="Ingresa el número de contacto"
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddFinanciera}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroFinanciera;
