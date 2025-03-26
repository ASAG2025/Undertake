import React from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaEmprendedores = ({ emprendedores, openEditModal, openDeleteModal }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Cédula</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {emprendedores.map((emprendedor) => (
          <tr key={emprendedor.id}>
            <td>{emprendedor.nombres}</td>
            <td>{emprendedor.apellidos}</td>
            <td>{emprendedor.cedula}</td>
            <td>{emprendedor.telefono}</td>
            <td>{emprendedor.direccion}</td>
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
