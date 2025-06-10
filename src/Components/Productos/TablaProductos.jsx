import React, { useState } from "react";
import { Table, Button, Image } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaProductos = ({ productos, openEditModal, openDeleteModal, handleCopy }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleDescripcion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderDescripcion = (descripcion, id) => {
    const limite = 40;
    if (descripcion.length <= limite) return descripcion;

    return (
      <>
        {expandedId === id ? descripcion : `${descripcion.slice(0, limite)}... `}
        <Button variant="link" size="sm" onClick={() => toggleDescripcion(id)}>
          {expandedId === id ? "Ver menos" : "Ver más"}
        </Button>
      </>
    );
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>
              {producto.imagen && (
                <Image src={producto.imagen} width="50" height="50" />
              )}
            </td>
            <td>{producto.nombre}</td>
            <td>{renderDescripcion(producto.descripcion, producto.id)}</td>
            <td>C${producto.precio}</td>
            <td>{producto.cantidad}</td>
            <td>{producto.categoria}</td>
            <td>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-2"
                onClick={() => openEditModal(producto)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={() => openDeleteModal(producto)}
              >
                <i className="bi bi-trash"></i>
              </Button>

              <Button
                variant="outline-info"
                size="sm"
                onClick={() => handleCopy(producto)}
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

export default TablaProductos;
