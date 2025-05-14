// src/Database/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { appfirebase } from "./FirebaseConfig";
import { db } from "./FirebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(appfirebase);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "Usuario", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRol(docSnap.data().rol);
        }
        setUser(firebaseUser);
      } else {
        setUser(null);
        setRol(null);
      }
      setLoading(false);  // Marca como cargado
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    const auth = getAuth(appfirebase);
    await signOut(auth);
    setUser(null);
    setRol(null);
  };

  if (loading) return <div>Cargando...</div>;

  const isLoggedIn = user !== null;  // Añadir isLoggedIn

  return (
    <AuthContext.Provider value={{ user, rol, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
