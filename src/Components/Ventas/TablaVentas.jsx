import React from "react";
import { Table, Button } from "react-bootstrap";

const TablaVentas = ({
  ventas,
  openEditModal,
  openDeleteModal,
  currentPage,
  itemsPerPage,
  setCurrentPage,
  totalItems,
}) => {
  const paginatedVentas = ventas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Emprendedor</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedVentas.length > 0 ? (
            paginatedVentas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.clienteNombre}</td>
                <td>{venta.emprendedorNombre}</td>
                <td>{venta.productoNombre}</td>
                <td>{venta.cantidad}</td>
                <td>
                  {venta.fecha
                    ? new Date(venta.fecha.seconds * 1000).toLocaleDateString()
                    : ""}
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => openEditModal(venta)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => openDeleteModal(venta)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No hay ventas para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TablaVentas;