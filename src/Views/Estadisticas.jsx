import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { db } from '../Database/FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import GraficoProductos from '../Components/Estadisticas/GraficoProductos';
import GraficoVentasMensuales from '../Components/Estadisticas/GraficoVentasMensuales';

const Estadisticas = () => {
  const [productos, setProductos] = useState([]);
  const [ventasMensuales, setVentasMensuales] = useState([]);

  const productosCollection = collection(db, 'Producto');
  const ventasCollection = collection(db, 'Venta');

  useEffect(() => {
    const unsubscribe = onSnapshot(productosCollection, (snapshot) => {
      const fetchedProductos = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductos(fetchedProductos);
    }, (error) => {
      console.error('Error al cargar productos:', error);
      alert('Error al cargar productos: ' + error.message);
    });

    const unsubscribeVentas = onSnapshot(ventasCollection, (snapshot) => {
      const ventas = snapshot.docs.map((doc) => doc.data());
      const resumen = {};

      ventas.forEach((venta) => {
        const fecha = venta.fecha?.toDate?.() || new Date();
        const mes = fecha.toLocaleString('default', { month: 'long' });
        const año = fecha.getFullYear();
        const clave = `${mes} ${año}`;

        if (!resumen[clave]) resumen[clave] = 0;
        resumen[clave] += parseFloat(venta.total || 0);
      });

      const datosMensuales = Object.entries(resumen).map(([mes, total]) => ({
        mes,
        total,
      }));

      // Ordena por fecha real (mes y año) para mejor visualización
      datosMensuales.sort((a, b) => {
        const [mesA, añoA] = a.mes.split(' ');
        const [mesB, añoB] = b.mes.split(' ');

        const fechaA = new Date(`${mesA} 1, ${añoA}`);
        const fechaB = new Date(`${mesB} 1, ${añoB}`);

        return fechaA - fechaB;
      });

      setVentasMensuales(datosMensuales);
    });

    return () => {
      unsubscribe();
      unsubscribeVentas();
    };
  }, []);

  const nombres = productos.map((producto) => producto.nombre);
  const precios = productos.map((producto) => parseFloat(producto.precio));

  return (
    <Container className="mt-5">
      <br />
      <h4>Estadísticas</h4>
      <Row className="mt-4">
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <GraficoProductos nombres={nombres} precios={precios} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <GraficoVentasMensuales datos={ventasMensuales} />
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;
