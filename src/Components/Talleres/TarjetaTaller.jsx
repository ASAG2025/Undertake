import React, { useState, useEffect } from "react";
import { Card, Col, Button, Badge, Ratio, Modal, Form } from "react-bootstrap";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../Database/FirebaseConfig";
import "bootstrap-icons/font/bootstrap-icons.css";

const obtenerVideoId = (url) => {
  if (!url) return null;
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const TarjetaTaller = ({
  taller,
  estado,
  nombreFinanciera,
  onInscribirse,
  onPlay,
  onEnded,
}) => {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [showResenaModal, setShowResenaModal] = useState(false);
  const [resena, setResena] = useState("");
  const [valoracion, setValoracion] = useState(0);
  const [resenas, setResenas] = useState([]);

  const videoId =
    taller.video_url &&
    (taller.video_url.includes("youtube.com") || taller.video_url.includes("youtu.be"))
      ? obtenerVideoId(taller.video_url)
      : null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUsuarioActual(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchResenas = async () => {
    const resenasCollection = collection(db, "ResenasTaller");
    const q = query(resenasCollection, where("id_taller", "==", taller.id));
    const querySnapshot = await getDocs(q);
    const fetchedResenas = querySnapshot.docs.map((doc) => doc.data());
    setResenas(fetchedResenas);
  };

  useEffect(() => {
    fetchResenas();
  }, []);

  const handleAgregarResena = async () => {
    if (!usuarioActual) {
      alert("Inicia sesión para dejar una reseña.");
      return;
    }
    if (!resena.trim()) {
      alert("Debes escribir una reseña.");
      return;
    }
    if (valoracion === 0) {
      alert("Debes seleccionar una valoración.");
      return;
    }

    await addDoc(collection(db, "ResenasTaller"), {
      id_taller: taller.id,
      id_usuario: usuarioActual.uid,
      nombre_usuario: usuarioActual.displayName || "Usuario anónimo",
      correo_usuario: usuarioActual.email,
      resena,
      valoracion,
      fecha: new Date(),
    });

    setResena("");
    setValoracion(0);
    setShowResenaModal(false);
    fetchResenas();
  };

  return (
    <Col md={3} sm={6} xs={12} className="mb-4">
      <Card>
        <Ratio aspectRatio="16x9">
          {taller.video_url ? (
            videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="video"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            ) : (
              <video
                controls
                src={taller.video_url}
                onPlay={onPlay}
                onEnded={onEnded}
                style={{ width: "100%", height: "100%" }}
              />
            )
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>Sin video disponible</span>
            </div>
          )}
        </Ratio>

        <Card.Body>
          <Card.Title>{taller.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Categoría: {taller.categoria}
          </Card.Subtitle>
          <Card.Text>{taller.descripcion}</Card.Text>
          <p>
            <strong>Financiera:</strong> {nombreFinanciera}
          </p>
          <Badge
            bg={
              estado === "Completado"
                ? "success"
                : estado === "En progreso"
                ? "warning"
                : "secondary"
            }
          >
            {estado}
          </Badge>
          <br />
          <br />
          {estado === "No iniciado" && (
            <Button variant="primary" size="sm" onClick={onInscribirse}>
              Inscribirme
            </Button>
          )}{" "}
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShowResenaModal(true)}
          >
            Reseñas ({resenas.length})
          </Button>
        </Card.Body>
      </Card>

      {/* Modal de Reseñas */}
      <Modal show={showResenaModal} onHide={() => setShowResenaModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Reseñas de "{taller.nombre}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resenas.length > 0 ? (
            resenas.map((r, idx) => (
              <div
                key={idx}
                className="p-3 mb-3"
                style={{
                  background: "#f8f9fa",
                  borderRadius: "10px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person-circle fs-3 me-2 text-secondary"></i>
                    <div>
                      <strong>{r.nombre_usuario}</strong>
                      <br />
                      <small className="text-muted">{r.correo_usuario}</small>
                    </div>
                  </div>
                  <div>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i
                        key={i}
                        className={`bi ${
                          i < r.valoracion ? "bi-star-fill text-warning" : "bi-star text-warning"
                        }`}
                      ></i>
                    ))}
                  </div>
                </div>
                <small className="text-muted">
                  {new Date(r.fecha.seconds * 1000).toLocaleString()}
                </small>
                <p className="mt-2 mb-0">{r.resena}</p>
              </div>
            ))
          ) : (
            <p className="text-muted">Sin reseñas aún.</p>
          )}

          <hr />
          <Form.Group className="mt-3">
            <Form.Label>Tu valoración:</Form.Label>
            <div className="mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <i
                  key={i}
                  className={`bi ${
                    i < valoracion ? "bi-star-fill text-warning" : "bi-star text-warning"
                  } fs-4`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setValoracion(i + 1)}
                ></i>
              ))}
            </div>
            <Form.Label>Tu reseña:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={resena}
              onChange={(e) => setResena(e.target.value)}
              placeholder="Escribe tu reseña..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResenaModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAgregarResena}>
            Publicar
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default TarjetaTaller;
