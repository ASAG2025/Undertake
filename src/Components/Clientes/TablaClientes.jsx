import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaClientes = ({ clientes, openEditModal, openDeleteModal }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleDireccion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderDireccion = (direccion, id) => {
    const limite = 40;
    if (!direccion) return "No disponible";
    if (direccion.length <= limite) return direccion;

    return (
      <>
        {expandedId === id ? direccion : `${direccion.slice(0, limite)}... `}
        <Button variant="link" size="sm" onClick={() => toggleDireccion(id)}>
          {expandedId === id ? "Ver menos" : "Ver más"}
        </Button>
      </>
    );
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id}>
            <td>
              {cliente.foto ? (
                <img
                  src={cliente.foto}
                  alt="Foto"
                  width="50"
                  height="50"
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                <span>Sin foto</span>
              )}
            </td>
            <td>{cliente.nombres}</td>
            <td>{cliente.apellidos}</td>
            <td>{cliente.telefono}</td>
            <td>{renderDireccion(cliente.direccion, cliente.id)}</td>
            <td>{cliente.correo}</td>
            <td>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-2"
                onClick={() => openEditModal(cliente)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => openDeleteModal(cliente)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaClientes;
