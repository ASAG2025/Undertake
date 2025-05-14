import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Database/AuthContext";

const ProtectedRoute = ({ element, roles }) => {
  const { user, rol } = useAuth();

  console.log("Usuario:", user?.email);
  console.log("Rol:", rol);
  console.log("Roles permitidos:", roles);

  if (!user) return <Navigate to="/" replace />;

  // Si se definen roles, valida que el usuario tenga un rol permitido
  if (roles && !roles.includes(rol)) return <Navigate to="/Inicio" replace />;

  return element;
};

export default ProtectedRoute;