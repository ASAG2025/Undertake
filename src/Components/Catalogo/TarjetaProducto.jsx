import { Card, Col, Button } from "react-bootstrap";
import { Zoom } from "react-awesome-reveal";

const TarjetaProducto = ({ producto, agregarProducto, openEditModal }) => {
  const handleAgregar = () => {
    agregarProducto({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
      emprendedorUID: producto.id_emprendedor,
      emprendedorNombre: producto.nombre_emprendedor,
    });
  };

  return (
    <Col lg={3} md={4} sm={12} className="mb-4">
      <Zoom cascade triggerOnce delay={10} duration={600}>
      <Card>
        {producto.imagen && (
          <Card.Img
            variant="top"
            src={producto.imagen}
            alt={producto.nombre}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderTopLeftRadius: "0.25rem",
              borderTopRightRadius: "0.25rem",
            }}
          />
        )}
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>
            Precio: C${producto.precio} <br />
            Categoría: {producto.categoria}
          </Card.Text>
          <Button variant="success" onClick={handleAgregar} className="me-2">
            Agregar al carrito
          </Button>
        </Card.Body>
      </Card>
      </Zoom>
    </Col>
  );
};

export default TarjetaProducto;
