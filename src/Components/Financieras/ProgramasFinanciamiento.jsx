import React from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";

const ProgramasFinanciamiento = ({ programas, onEditar, onEliminar }) => {
  return (
    <Row>
      {programas.map((programa) => (
        <Col
          key={programa.id}
          xs={12}
          sm={12}
          md={6}
          lg={4}
          className="mb-3"
        >
          <Card className="h-100">
            <Card.Body>
              <Card.Title>{programa.Nombre_Programa}</Card.Title>
              {programa.Imagen && (
                  <Image src={programa.Imagen} width="100" height="100" />
              )}

              <Card.Text>
                <strong>Monto Máximo:</strong> C${programa.Monto_Maximo}
              </Card.Text>
              <Card.Text>
                <strong>Interés:</strong> {programa.Interes}%
              </Card.Text>
              <Card.Text>
                <strong>Fecha de Inicio:</strong> {programa.Fecha_Inicio}
              </Card.Text>
              <Card.Text>
                <strong>Fecha de Fin:</strong> {programa.Fecha_Fin}
              </Card.Text>
              <Card.Text>
                <strong>Descripción:</strong> {programa.Descripcion}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center" style={{ gap: '10px' }}>
              <Button
                variant="primary"
                onClick={() => onEditar(programa)}
              >
                Editar
              </Button>

              <Button
                variant="danger"
                onClick={() => onEliminar(programa.id)}
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

export default ProgramasFinanciamiento;