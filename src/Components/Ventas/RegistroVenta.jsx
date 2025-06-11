import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, InputGroup } from "react-bootstrap";

const RegistroVenta = ({
  show,
  onHide,
  idProducto,
  setIdProducto,
  cantidad,
  setCantidad,
  itemsVenta,
  agregarProductoAVenta,
  handleSubmit,
  productos,
  total,
}) => {
  const productoSeleccionado = productos.find((p) => p.id === idProducto);
  const precio = productoSeleccionado ? productoSeleccionado.precio : 0;
  const subtotal = cantidad * precio;

  // Estados de validación
  const [productoValido, setProductoValido] = useState(false);
  const [cantidadValida, setCantidadValida] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  // Funciones de validación
  const validarProducto = (valor) => {
    if (!valor) return "Debes seleccionar un producto.";
    return "";
  };

  const validarCantidad = (valor) => {
    if (!valor) return "Debes ingresar una cantidad.";
    if (isNaN(valor) || valor <= 0)
      return "La cantidad debe ser un número mayor a 0.";
    return "";
  };

  // Validación general
  const isFormValid = () => {
    return validarProducto(idProducto) === "" && validarCantidad(cantidad) === "";
  };

  // Actualizar flags al cambiar inputs
  useEffect(() => {
    setProductoValido(validarProducto(idProducto) === "");
    setCantidadValida(validarCantidad(cantidad) === "");
  }, [idProducto, cantidad]);

  return (
    <Modal show={show} onHide={onHide}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setFormValidated(true);
          if (isFormValid()) handleSubmit();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Producto</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-box" /></InputGroup.Text>
              <Form.Select
                value={idProducto}
                onChange={(e) => setIdProducto(e.target.value)}
                
              >
                <option value="">-- Selecciona un producto --</option>
                {productos.map((producto) => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre}
                  </option>
                ))}
              </Form.Select>
              
            </InputGroup>
          </Form.Group>

          {idProducto && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <InputGroup>
                  <InputGroup.Text>C$</InputGroup.Text>
                  <Form.Control type="number" value={precio} disabled />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-plus-circle" /></InputGroup.Text>
                  <Form.Control
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    isInvalid={formValidated && !!validarCantidad(cantidad)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validarCantidad(cantidad)}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subtotal</Form.Label>
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-cash-coin" /></InputGroup.Text>
                  <Form.Control type="number" value={subtotal} disabled />
                </InputGroup>
              </Form.Group>

              <div className="d-grid">
                <Button
                  variant="outline-primary"
                  type="button"
                  onClick={() => {
                    setFormValidated(true);
                    if (isFormValid()) agregarProductoAVenta();
                  }}
                >
                  <i className="bi bi-cart-plus" /> Agregar a la venta
                </Button>
              </div>
            </>
          )}

          {itemsVenta.length > 0 && (
            <>
              <hr />
              <h6>Productos agregados:</h6>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsVenta.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombre}</td>
                      <td>${item.precio}</td>
                      <td>{item.cantidad}</td>
                      <td>${item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RegistroVenta;
