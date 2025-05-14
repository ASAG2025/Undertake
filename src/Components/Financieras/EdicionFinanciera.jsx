import React from "react";
import { Modal, Form, Button, Row, Col, InputGroup, Row, Col } from "react-bootstrap";

const EdicionFinanciera = ({
  showEditModal,
  setShowEditModal,
  financieraEditada,
  handleEditInputChange,
  handleEditFinanciera,
  handleFileChange
}) => {
  if (!financieraEditada) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar Institución Financiera</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Imagen tipo avatar */}
          <Form.Group className="mb-3 text-center" style={{ position: "relative" }}>
            <Form.Control
              id="editFileInput"
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
                backgroundImage: financieraEditada.Imagen
                  ? `url(${financieraEditada.Imagen})`
                  : `url('https://cdn-icons-png.flaticon.com/512/1995/1995475.png')`, // Ícono predeterminado
                position: "relative",
              }}
            >
              <label htmlFor="editFileInput" style={{ position: "absolute", bottom: "0", right: "0", cursor: "pointer" }}>
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
            <Form.Label style={{ marginTop: "10px" }}>Logo de la institución</Form.Label>
          </Form.Group>

          {/* Campos con íconos */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre Institución</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-bank" /></InputGroup.Text>
              <Form.Control
                type="text"
                name="Nombre_Institucion"
                value={financieraEditada.Nombre_Institucion}
                onChange={handleEditInputChange}
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
                value={financieraEditada.Direccion}
                onChange={handleEditInputChange}
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
                value={financieraEditada.Contacto}
                onChange={handleEditInputChange}
                placeholder="Ingresa el contacto"
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditFinanciera}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionFinanciera;
