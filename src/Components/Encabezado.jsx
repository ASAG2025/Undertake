import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../assets/LogoUndertake.png";
import { useAuth } from "../Database/AuthContext";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../App.css";
import { useCarrito } from "../Components/Carrito/CarritoContext";

const Encabezado = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isLoggedIn, logout, rol } = useAuth();  // Asumiendo que 'rol' viene de tu AuthContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsCollapsed(false);
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminPassword");
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleToggle = () => setIsCollapsed(!isCollapsed);
  const handleNavigate = (path) => {
    navigate(path);
    setIsCollapsed(false);
  };

  const { carrito } = useCarrito();
  const cantidadProductos = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <Navbar expand="md" fixed="top" className="color-navbar">
      <Container>
        <Navbar.Brand onClick={() => handleNavigate("/Inicio")} className="text-white" style={{ cursor: "pointer" }}>
          <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{" "}
          <strong>Undertake</strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" onClick={handleToggle} />
        
        {isLoggedIn && (
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
                
                {/* Enlace común: Inicio */}
                <Nav.Link onClick={() => handleNavigate("/Inicio")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                  {isCollapsed ? <i className="bi-house-door-fill me-2"></i> : null}
                  <strong>Inicio</strong>
                </Nav.Link>
                {/* Menú para Administrador (acceso total) */}
                {rol === "Administrador" && (
                  <>
                    <Nav.Link onClick={() => handleNavigate("/Emprendedores")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Emprendedores</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Negocios")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Negocios</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Productos")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Productos</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Categorias")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Categorías</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Catalogo")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Catálogo</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Financieras")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Financieras</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Programas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Programas</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/CardTaller")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Talleres</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Estadisticas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Estadisticas</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Clientes")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Clientes</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/HistorialVentas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Historial Ventas</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Carrito")} className={isCollapsed ? "color-texto-marca position-relative" : "text-white position-relative"}>
                      <i className="bi bi-cart me-2"></i>
                      {isCollapsed && <strong>Carrito</strong>}
                      {cantidadProductos > 0 && (
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                          style={{ fontSize: '0.7rem' }}
                        >
                          {cantidadProductos}
                        </span>
                      )}
                    </Nav.Link>
                  </>
                )}
                
                {/* Menú para Emprendedor */}
                {rol === "Emprendedor" && (
                  <>
                    <Nav.Link onClick={() => handleNavigate("/Emprendedores")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Emprendedores</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Negocios")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Negocios</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Productos")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Productos</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Categorias")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Categorías</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Catalogo")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Catálogo</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/CardTaller")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Talleres</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Estadisticas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Estadisticas</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Clientes")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Clientes</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Reseñas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Reseñas</strong>
                    </Nav.Link>
                  </>
                )}

                {/* Menú para Financiera */}
                {rol === "Financiera" && (
                  <>
                    <Nav.Link onClick={() => handleNavigate("/Financieras")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Financieras</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Programas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Programas</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/CardTaller")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Talleres</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Reseñas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Reseñas</strong>
                    </Nav.Link>
                  </>
                )}
                
                {/* Opción de cerrar sesión */}
                {isLoggedIn ? (
                  <Nav.Link onClick={handleLogout} className={isCollapsed ? "text-black" : "text-white"}>
                    Cerrar Sesión
                  </Nav.Link>
                ) : location.pathname === "/" && (
                  <Nav.Link onClick={() => handleNavigate("/")} className={isCollapsed ? "text-black" : "text-white"}>
                    Iniciar Sesión
                  </Nav.Link>
                )}

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        )}
      </Container>
    </Navbar>
  );
};

export default Encabezado;