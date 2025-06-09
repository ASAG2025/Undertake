import React from "react";
import { Row, Col, Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import "../App.css";

const LoginForm = ({ email, password, error, setEmail, setPassword, handleSubmit, onCreateAccount }) => {
  return (
    <Row className="w-100 justify-content-center">
      <Col md={6} lg={5} xl={4}>
        <Card className="p-4 shadow-lg">
          <Card.Body>
            <h3 className="text-center mb-4">Iniciar Sesión</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="emailUsuario">
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-envelope" /></InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="contraseñaUsuario">
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-lock" /></InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Iniciar Sesión
              </Button>

              <Button variant="secondary" className="w-100 mt-3" onClick={onCreateAccount}>
                Crear cuenta
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
