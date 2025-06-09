import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Database/FirebaseConfig";
import { Dropdown } from "react-bootstrap";

const obtenerPerfilUsuarioActual = async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  try {
    const usuarioDoc = await getDoc(doc(db, "Usuario", currentUser.uid));
    if (!usuarioDoc.exists()) return null;

    const { rol } = usuarioDoc.data();
    const perfilDoc = await getDoc(doc(db, rol, currentUser.uid));
    if (!perfilDoc.exists()) return null;

    const data = perfilDoc.data();
    return {
      foto: data.foto || null,
      nombres: data.nombres || "",
      apellidos: data.apellidos || "",
      rol,
    };
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return null;
  }
};

const PerfilUsuario = () => {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      const data = await obtenerPerfilUsuarioActual();
      setPerfil(data);
    };
    cargarPerfil();
  }, []);

  const cerrarSesion = async () => {
    const auth = getAuth();
    await signOut(auth);
    window.location.reload(); // O redireccionar
  };

  if (!perfil) return null;

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="light"
        id="dropdown-user"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <img
          src={perfil.foto || "/default-avatar.png"}
          alt="Foto"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <span>{perfil.nombres.split(" ")[0]}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>
          {perfil.nombres} {perfil.apellidos}
          <br />
          <small>{perfil.rol}</small>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item onClick={cerrarSesion}>Cerrar sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PerfilUsuario;
