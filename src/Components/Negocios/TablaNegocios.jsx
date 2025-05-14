import React, { useState } from "react";
import { Table, Button, Image } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaNegocios = ({ negocios, openEditModal, openDeleteModal }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleDescripcion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderDescripcion = (descripcion, id) => {
    const limite = 40;
    if (!descripcion) return "";
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
          <th>Logo</th>
          <th>Nombre del Negocio</th>
          <th>Descripción</th>
          <th>Categoría</th>
          <th>Ubicación</th>
          <th>Propietario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {negocios.map((negocio) => (
          <tr key={negocio.id}>
            <td>
              {negocio.logo ? (
                <img
                  src={negocio.logo}
                  alt="Foto"
                  width="50"
                  height="50"
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                <span>Sin foto</span>
              )}
            </td>
            <td>{negocio.nombre_negocio}</td>
            <td>{renderDescripcion(negocio.descripcion, negocio.id)}</td>
            <td>{negocio.categoria}</td>
            <td>{negocio.ubicacion}</td>
            <td>{negocio.nombres}</td>
            <td>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-2"
                onClick={() => openEditModal(negocio)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => openDeleteModal(negocio)}
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

export default TablaNegocios;
