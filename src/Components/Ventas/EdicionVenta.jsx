// src/Components/Ventas/ModalEdicionVenta.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../../Database/FirebaseConfig";

const EdicionVenta = ({
  show,
  onHide,
  ventaEditada,
  fetchVentas,
  setShowEdicion,
}) => {
  const [venta, setVenta] = useState({
    clienteNombre: "",
    emprendedorNombre: "",
    producto: "",
    cantidad: 1,
    fecha: new Date(),
  });

  useEffect(() => {
    if (ventaEditada) {
      setVenta({
        ...ventaEditada,
        fecha: ventaEditada.fecha
          ? new Date(ventaEditada.fecha.seconds * 1000)
          : new Date(),
      });
    }
  }, [ventaEditada]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ventaRef = doc(db, "Ventas", ventaEditada.id);
      await updateDoc(ventaRef, {
        clienteNombre: venta.clienteNombre,
        emprendedorNombre: venta.emprendedorNombre,
        producto: venta.producto,
        cantidad: venta.cantidad,
        fecha: Timestamp.fromDate(new Date(venta.fecha)),
      });
      fetchVentas();
      setShowEdicion(false);
    } catch (error) {
      console.error("Error al actualizar venta:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="clienteNombre">
            <Form.Label>Nombre del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="clienteNombre"
              value={venta.clienteNombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="emprendedorNombre">
            <Form.Label>Nombre del Emprendedor</Form.Label>
            <Form.Control
              type="text"
              name="emprendedorNombre"
              value={venta.emprendedorNombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="producto">
            <Form.Label>Producto</Form.Label>
            <Form.Control
              type="text"
              name="producto"
              value={venta.producto}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cantidad">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
              min="1"
              value={venta.cantidad}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={venta.fecha.toISOString().slice(0, 10)}
              onChange={(e) =>
                setVenta((prev) => ({ ...prev, fecha: e.target.value }))
              }
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EdicionVenta;