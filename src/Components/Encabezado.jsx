import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../assets/react.svg";
import { useAuth } from "../Database/AuthContext";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../App.css";

const Encabezado = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Cerrar el offcanvas antes de proceder
      setIsCollapsed(false);

      // Eliminar variables almacenadas en localStorage
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminPassword");

      // Cerrar sesión
      await logout();

      // Redirigir al inicio
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  // Funciones de navegación
  const handleNavigate = (path) => {
    navigate(path);
    setIsCollapsed(false);
  };

  return (
    <Navbar expand="md" fixed="top" className="color-navbar">
      <Container>
        <Navbar.Brand onClick={() => handleNavigate("/inicio")} className="text-white" style={{ cursor: "pointer" }}>
          <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{" "}
          <strong>Undertake</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" onClick={handleToggle} />
        { isLoggedIn &&
          <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="end"
          show={isCollapsed}
          onHide={() => setIsCollapsed(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id="offcanvasNavbarLabel-expand-sm"
              className={isCollapsed ? "color-texto-marca" : "text-white"}
            >
              Menú
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">

              <Nav.Link
                onClick={() => handleNavigate("/inicio")}
                className={isCollapsed ? "color-texto-marca" : "text-white"}
              >
                {isCollapsed ? <i className="bi-house-door-fill me-2"></i> : null}
                <strong>Inicio</strong>
              </Nav.Link>

              <Nav.Link                 
                onClick={() => handleNavigate("/Categorias")}                 
                className={isCollapsed ? "color-texto-marca" : "text-white"}               
              >                 
                <strong>Categorias</strong>               
              </Nav.Link> 

              <Nav.Link                 
                onClick={() => handleNavigate("/Emprendedores")}                 
                className={isCollapsed ? "color-texto-marca" : "text-white"}               
              >                 
                <strong>Emprendedores</strong>               
              </Nav.Link>

              <Nav.Link                 
                onClick={() => handleNavigate("/Financieras")}                 
                className={isCollapsed ? "color-texto-marca" : "text-white"}               
              >                 
                <strong>Financieras</strong>               
              </Nav.Link> 

              <Nav.Link                 
                onClick={() => handleNavigate("/Productos")}                 
                className={isCollapsed ? "color-texto-marca" : "text-white"}               
              >                 
                <strong>Productos</strong>               
              </Nav.Link> 

              {isLoggedIn ? (
                <>
                  <Nav.Link onClick={handleLogout} className={isCollapsed ? "text-black" : "text-white"}>
                    Cerrar Sesión
                  </Nav.Link>
                </>
              ) : location.pathname === "/" && (
                <Nav.Link
                  onClick={() => handleNavigate("/")}
                  className={isCollapsed ? "text-black" : "text-white"}
                >
                  Iniciar Sesión
                </Nav.Link>
              )}

            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        }
      </Container>
    </Navbar>
  );
};

export default Encabezado;