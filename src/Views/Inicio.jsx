import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../Cards.css"; 

const Inicio = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Container className="mt-5">
      <div className="welcome-section text-center mb-5 px-4">
        <h1 className="fw-bold mb-4 animated fadeIn" style={{ fontSize: "2rem", color: "#2C3E50" }}>
          <span className="welcome-text">Bienvenido a Underdake</span> donde los emprendedores comienzan a construir su futuro. 💼
        </h1>
        <p className="fw-bold mb-5 animated fadeIn" style={{ fontSize: "1.25rem", color: "#2C3E50" }}>
          <span className="welcome-text">Administra tus programas de financiamiento y registra tu usuario</span> como emprendedor o financiera.
        </p>
      </div>

      {/* Agregando clases responsive para adaptar las tarjetas */}
      <Row className="g-4 justify-content-center animated fadeIn">
        {/* Columna para las tarjetas con ajuste para pantallas pequeñas */}
        <Col xs={12} sm={6} md={4}>
          <Card className="card shadow-sm border-0 h-100 blue">
            <Card.Body className="text-center">
              <Card.Title>Programas 📋</Card.Title>
              <Card.Text>Visualiza, crea y edita programas de financiamiento.</Card.Text>
              <Button variant="success" className="card-button" onClick={() => handleNavigate("/programas")}>
                Ir a Programas
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Card className="card shadow-sm border-0 h-100 green">
            <Card.Body className="text-center">
              <Card.Title>Instituciones 🏦</Card.Title>
              <Card.Text>Administra tu institución financiera registrada.</Card.Text>
              <Button variant="success" className="card-button" onClick={() => handleNavigate("/financieras")}>
                Ver Instituciones
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Card className="card shadow-sm border-0 h-100 red">
            <Card.Body className="text-center">
              <Card.Title>Emprendedores 👏</Card.Title>
              <Card.Text>Administra tu usuario registrado.</Card.Text>
              <Button variant="success" className="card-button" onClick={() => handleNavigate("/emprendedores")}>
                Ver emprendedores
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Inicio;