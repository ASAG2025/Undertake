import React from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";

const CardsFinancieras = ({ financieras, openEditModal, openDeleteModal }) => {
  return (
    <Row>
      {financieras.map((financiera) => (
        <Col
          key={financiera.id}
          xs={6}  
          sm={6}  
          md={4}  
          lg={3}  
          className="mb-3"
        >
          <Card className="h-100">
            <Card.Body>
              { financiera.Imagen && (
                <Image src={financiera.Imagen} width="100" height="100" />
              )
              }
              <Card.Title>{financiera.Nombre_Institucion}</Card.Title>
              <Card.Text>
                <strong>Dirección:</strong> {financiera.Direccion}
              </Card.Text>
              <Card.Text>
                <strong>Contacto:</strong> {financiera.Contacto}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center" style={{ gap: '10px' }}>
            <Button
                variant="primary"
                onClick={() => openEditModal(financiera)}
            >
                Editar
            </Button>

            <Button
                variant="danger"
                onClick={() => openDeleteModal(financiera)}
            >
                Eliminar
            </Button>
            </Card.Footer>





          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardsFinancieras;