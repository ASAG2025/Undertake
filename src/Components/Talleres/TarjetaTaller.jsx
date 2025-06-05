import React from "react";
import { Card, Col, Button, Badge, Ratio } from "react-bootstrap";

const TarjetaTaller = ({
  taller,
  estado,
  nombreFinanciera,
  onInscribirse,
  onPlay,
  onEnded,
}) => {
  return (
    <Col md={3} sm={6} xs={12} className="mb-4">
      <Card>
        <Ratio aspectRatio="16x9">
          {taller.video_url ? (
            taller.video_url.includes("youtube.com") ||
            taller.video_url.includes("youtu.be") ? (
              <iframe
                src={taller.video_url}
                title="video"
                allowFullScreen
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
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TarjetaTaller;
