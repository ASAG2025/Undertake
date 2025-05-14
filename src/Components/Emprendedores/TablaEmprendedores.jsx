import React, { useState }  from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaEmprendedores = ({ emprendedores, openEditModal, openDeleteModal }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleDireccion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderDireccion= (direccion, id) => {
    const limite = 40;
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
          <th>Cédula</th>
          <th>Género</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {emprendedores.map((emprendedor) => (
          <tr key={emprendedor.id}>
            <td>
              {emprendedor.foto ? (
                <img
                  src={emprendedor.foto}
                  alt="Foto"
                  width="50"
                  height="50"
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                <span>Sin foto</span>
              )}
            </td>
            <td>{emprendedor.nombres}</td>
            <td>{emprendedor.apellidos}</td>
            <td>{emprendedor.cedula}</td>
            <td>{emprendedor.genero}</td>
            <td>{emprendedor.telefono}</td>
            <td>{renderDireccion(emprendedor.direccion, emprendedor.id)}</td>
            <td>{emprendedor.correo}</td>
            <td>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-2"
                onClick={() => openEditModal(emprendedor)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => openDeleteModal(emprendedor)}
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

export default TablaEmprendedores;
