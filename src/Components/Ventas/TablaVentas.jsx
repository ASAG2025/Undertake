import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaVentas = ({ ventas, openEditModal, openDeleteModal, handleCopyVenta, generarPDFDetalleVenta }) => {

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio unitario</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th>Fecha</th>
          <th>Negocio</th>
          <th>Propietario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map((venta) => (
          <tr key={`${venta.id_negocio}-${venta.id_producto}-${venta.id_emprendedor}-${venta.fecha}`}>
            <td>{venta.nombre_producto}</td>
            <td>C${venta.precio_producto}</td>
            <td>{venta.cantidad}</td>
            <td>C${venta.subtotal}</td>
            <td>{new Date(venta.fecha).toLocaleDateString()}</td>
            <td>{venta.nombre_negocio}</td>
            <td>{venta.nombre_emprendedor}</td>
            <td>
              <Button
                variant="outline-secondary"
                size="sm"
                className="me-2"
                onClick={() => generarPDFDetalleVenta(venta)}
                   
                >
                 <i className="bi bi-filetype-pdf" />
              </Button>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-2"
                onClick={() => openEditModal(venta)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={() => openDeleteModal(venta)}
              >
                <i className="bi bi-trash"></i>
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => handleCopyVenta(venta)}
              >
                <i className="bi bi-clipboard"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaVentas;
