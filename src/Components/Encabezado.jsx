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
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";


const Encabezado = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isLoggedIn, logout, rol, user, perfil } = useAuth();  // Asumiendo que 'rol' viene de tu AuthContext
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
                   <Nav.Link onClick={() => handleNavigate("/Categorias")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Categorías</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Clientes")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Clientes</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Emprendedores")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Emprendedores</strong>
                    </Nav.Link>
                    <Dropdown className="mb-2">
                    <Dropdown.Toggle
                      variant="link"
                      className={isCollapsed ? "color-texto-marca text-decoration-none" : "text-white text-decoration-none"}
                      id="dropdown-productos-catalogo"
                    >
                      <strong>Financieras</strong>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleNavigate("/Financieras")}>Financieras</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleNavigate("/Programas")}>Programas</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    <Nav.Link onClick={() => handleNavigate("/Negocios")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Negocios</strong>
                    </Nav.Link>
                    <Dropdown className="mb-2">
                    <Dropdown.Toggle
                      variant="link"
                      className={isCollapsed ? "color-texto-marca text-decoration-none" : "text-white text-decoration-none"}
                      id="dropdown-productos-catalogo"
                    >
                      <strong>Productos</strong>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleNavigate("/Productos")}>Productos</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleNavigate("/Catalogo")}>Catálogo</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                    <Nav.Link onClick={() => handleNavigate("/Talleres")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Talleres</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Estadisticas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Estadisticas</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Ventas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Ventas</strong>
                    </Nav.Link>
                    {/*<Nav.Link onClick={() => handleNavigate("/HistorialVentas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>HistorialVentas</strong>
                    </Nav.Link>*/}
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
                  <Nav.Link onClick={() => handleNavigate("/Categorias")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Categorías</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Clientes")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Clientes</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Emprendedores")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Emprendedores</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Negocios")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Negocios</strong>
                    </Nav.Link>
                    <Dropdown className="mb-2">
                    <Dropdown.Toggle
                      variant="link"
                      className={isCollapsed ? "color-texto-marca text-decoration-none" : "text-white text-decoration-none"}
                      id="dropdown-productos-catalogo"
                    >
                      <strong>Productos</strong>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleNavigate("/Productos")}>Productos</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleNavigate("/Catalogo")}>Catálogo</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                   <Nav.Link onClick={() => handleNavigate("/Programas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Programas</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Talleres")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Talleres</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Estadisticas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Estadisticas</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Ventas")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Ventas</strong>
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
                    <Nav.Link onClick={() => handleNavigate("/Talleres")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Talleres</strong>
                    </Nav.Link>
                  </>
                )}

                {/* Menú para Financiera */}
                {rol === "Cliente" && (
                  <>
                    <Nav.Link onClick={() => handleNavigate("/Clientes")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Clientes</strong>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigate("/Catalogo")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                      <strong>Catalogo</strong>
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

               {isLoggedIn && perfil && (
                  <Dropdown align="end" className="d-none d-md-block">
                    <Dropdown.Toggle
                      variant="link"
                      className="text-white text-decoration-none d-flex align-items-center"
                      id="dropdown-perfil"
                    >
                      <img
                        src={perfil.foto || "https://via.placeholder.com/40"}
                        alt="Foto de perfil"
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <span>{perfil.nombres} {perfil.apellidos}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}

                {/* Opción de cerrar sesión */}
                {!isLoggedIn && (
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