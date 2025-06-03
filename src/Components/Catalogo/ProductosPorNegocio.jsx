import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TarjetaProducto from "./TarjetaProducto";

const ProductosPorNegocio = ({ productos, openEditModal, negocios, agregarProducto}) => {
  // Generar un mapa de negocios (id -> nombre y logo)
  const negociosMap = negocios?.reduce((acc, negocio) => {
    acc[negocio.id] = { nombre: negocio.nombre_negocio, logo: negocio.logo };
    return acc;
  }, {}) || {};

  // Agrupar los productos por id_negocio
  const productosAgrupados = productos.reduce((acc, producto) => {
    const idNegocio = producto.id_negocio;
    if (!acc[idNegocio]) {
      acc[idNegocio] = [];
    }
    acc[idNegocio].push(producto);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(productosAgrupados).map(([idNegocio, productos]) => {
        const { nombre, logo } = negociosMap[idNegocio] || { nombre: "Sin nombre", logo: "" };
        return (
          <div key={idNegocio} className="mb-4">
            <h5 className="mb-3">
              <Link to={`/Negocios/${idNegocio}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {logo && <img src={logo} alt={nombre} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{nombre}</span>
            </div>
              </Link>
            </h5>
            <Row>
              {productos.map((producto) => (
                <TarjetaProducto
                  key={producto.id}
                  producto={producto}
                  openEditModal={openEditModal}
                  agregarProducto={agregarProducto}
                />
              ))}
            </Row>
          </div>
        );
      })}
    </>
  );
};

export default ProductosPorNegocio;
