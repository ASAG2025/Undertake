import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Database/FirebaseConfig";
import { useAuth } from "../Database/AuthContext";
import Table from "react-bootstrap/Table";

const HistorialVentas = () => {
  const { user } = useAuth();
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      const q = query(collection(db, "VentaOnline"), where("id_emprendedor", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const resultados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVentas(resultados);
    };

    fetchVentas();
  }, [user.uid]);

  return (
    <div className="container mt-4">
    <br />
    <br />
      <h2>Historial de Ventas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id}>
              <td>{venta.nombre}</td>
              <td>{venta.cantidad}</td>
              <td>C${venta.precio}</td>
              <td>C${venta.total}</td>
              <td>{venta.fecha?.toDate().toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HistorialVentas;