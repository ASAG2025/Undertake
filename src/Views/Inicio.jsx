import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../Cards.css"; 
import logo from "../assets/LogoUndertake.png";
import ModalInstalacionIOS from "../Components/Inicio/ModalInstalacionIOS";

const Inicio = () => {
    const [solicitudInstalacion, setSolicitudInstalacion] = useState(null);
    const [mostrarBotonInstalacion, setMostrarBotonInstalacion] = useState(false);
    const [esDispositivoIOS, setEsDispositivoIOS] = useState(false);
    const [mostrarModalInstrucciones, setMostrarModalInstrucciones] = useState(false);

    const abrirModalInstrucciones = () => setMostrarModalInstrucciones(true);
    const cerrarModalInstrucciones = () => setMostrarModalInstrucciones(false);

    // Detectar dispositivo iOS
    useEffect(() => {
    const esIOS = /iPad iPhone iPod/.test(navigator.userAgent) && !window.MSStream;
    setEsDispositivoIOS(esIOS);
    }, []);

    // Manejar evento beforeinstallprompt
    useEffect(() => {
    const manejarSolicitudInstalacion = (evento) => {
    evento.preventDefault();
    setSolicitudInstalacion (evento);
    setMostrarBotonInstalacion(true);

    };

    window.addEventListener("beforeinstallprompt", manejarSolicitudInstalacion);
    return () => {
    window.removeEventListener("beforeinstallprompt", manejarSolicitudInstalacion);
    };
    }, []);

    const instalacion = async() => {
    if (!solicitudInstalacion) return;

    try {
    await solicitudInstalacion.prompt();
    const { outcome } = await solicitudInstalacion.userChoice;
    console.log(outcome == "accepted"? "Instalación aceptada": "Instalación rechazada");
    } catch (error) {
    console.error("Error al intentar instalar la PWA:", error);
    } finally {
    setSolicitudInstalacion (null);
    setMostrarBotonInstalacion(false);
    }

    };

  return (
    <div
          style={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center 20px",
          backgroundColor: "#E0F7FA",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          paddingTop: "80px",
          textAlign: "center",
        }}
      >


      <h1 className="text-3d" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Bienvenido a <span style={{ color: "#00796b" }}>Undertake</span>
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#004d40", fontWeight: "bold", maxWidth: "600px" }}>
        Donde los emprendedores comienzan a construir su futuro. 💼
      </p>

    <br/>

      {!esDispositivoIOS && mostrarBotonInstalacion && (

      <div className="my-4">

      <Button className="sombra" variant="primary" onClick={instalacion}>
      Instalar app Undertake <i className="bi-download"></i>
      </Button>
      </div>

      )}

      {esDispositivoIOS && (
        <div className="text-center my-4">
        <Button className="sombra" variant="primary" onClick={abrirModalInstrucciones}>
        Cómo instalar Undertake en iPhone <i className="bi-phone"></i>
        </Button>
      </div>
      )}

        <ModalInstalacionIOS
        mostrar={mostrarModalInstrucciones}
        cerrar={cerrarModalInstrucciones}
        />
      </div>
  
  )
};

export default Inicio;