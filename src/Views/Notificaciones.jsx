import React, { useEffect, useState } from "react";
import { db, auth } from "../Database/FirebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Container, Button, ListGroup, Badge } from "react-bootstrap";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [filtro, setFiltro] = useState("todas");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUsuarioActual(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchNotificaciones = async () => {
    if (!usuarioActual) return;

    const notificacionesRef = collection(db, "Notificaciones");
    const q = query(
      notificacionesRef,
      where("usuarioId", "==", usuarioActual.uid),
      orderBy("fecha", "desc")
    );
    const data = await getDocs(q);

    const fetched = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setNotificaciones(fetched);
  };

  const marcarComoLeida = async (id) => {
    const notiRef = doc(db, "Notificaciones", id);
    await updateDoc(notiRef, { leida: true });
    fetchNotificaciones();
  };

  useEffect(() => {
    fetchNotificaciones();
  }, [usuarioActual]);

  const filtradas =
    filtro === "todas"
      ? notificaciones
      : notificaciones.filter((n) => n.tipo === filtro);

  return (
    <Container className="mt-5">
      <h4>Notificaciones</h4>

      <div className="mb-3 d-flex gap-2">
        <Button variant={filtro === "todas" ? "primary" : "outline-primary"} onClick={() => setFiltro("todas")}>
          Todas
        </Button>
        <Button variant={filtro === "inscripcion_taller" ? "primary" : "outline-primary"} onClick={() => setFiltro("inscripcion_taller")}>
          Inscripciones
        </Button>
        <Button variant={filtro === "completado_taller" ? "primary" : "outline-primary"} onClick={() => setFiltro("completado_taller")}>
          Completados
        </Button>
      </div>

      {filtradas.length > 0 ? (
        <ListGroup>
          {filtradas.map((n) => (
            <ListGroup.Item
              key={n.id}
              action
              onClick={() => marcarComoLeida(n.id)}
              className="d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: n.leida ? "#f8f9fa" : "#e7f1ff",
                cursor: "pointer"
              }}
            >
              <div>
                <strong>{n.tipo === "inscripcion_taller" ? "📝" : "✅"} </strong>
                {n.contenido}
                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {moment(n.fecha?.toDate?.()).fromNow()}
                </div>
              </div>
              {!n.leida && <Badge bg="primary">Nuevo</Badge>}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-muted">No hay notificaciones aún.</p>
      )}
    </Container>
  );
};

export default Notificaciones;
