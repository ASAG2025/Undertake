import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { appfirebase, db } from "./FirebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(appfirebase);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const usuarioRef = doc(db, "Usuario", firebaseUser.uid);
        const usuarioSnap = await getDoc(usuarioRef);

        if (usuarioSnap.exists()) {
          const data = usuarioSnap.data();
          setRol(data.rol);

          let collectionName = "";
          switch (data.rol) {
            case "Administrador":
              collectionName = "Administrador";
              break;
            case "Financiera":
              collectionName = "Financiera";
              break;
            case "Emprendedor":
              collectionName = "Emprendedor";
              break;
            case "Cliente":
              collectionName = "Cliente";
              break;
            default:
              collectionName = "";
          }

          if (collectionName) {
            const perfilRef = doc(db, collectionName, firebaseUser.uid);
            const perfilSnap = await getDoc(perfilRef);

            if (perfilSnap.exists()) {
              setPerfil(perfilSnap.data());
            }
          }
        }

        setUser(firebaseUser);
      } else {
        setUser(null);
        setRol(null);
        setPerfil(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    const auth = getAuth(appfirebase);
    await signOut(auth);
    setUser(null);
    setRol(null);
    setPerfil(null);
  };

  if (loading) return <div>Cargando...</div>;

  const isLoggedIn = user !== null;

  return (
    <AuthContext.Provider value={{ user, rol, perfil, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
