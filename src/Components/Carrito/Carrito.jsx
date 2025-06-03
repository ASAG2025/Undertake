import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useCarrito } from "../Carrito/CarritoContext";
import { db } from "../../Database/FirebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../Database/AuthContext";
import StripeConfig from "../../Stripe/StripeConfig";
import FormularioPago from "../MetodoPago/FormularioPago";
import { jsPDF } from "jspdf";

const Carrito = () => {
  const { carrito, eliminarProducto, vaciarCarrito } = useCarrito();
  const { user } = useAuth();

  const [mostrarModalPago, setMostrarModalPago] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");
  const [mostrarFormularioPago, setMostrarFormularioPago] = useState(false);

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const generarFacturaPDF = (ventaItems, totalCompra) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Factura de Compra", 14, 22);
    doc.setFontSize(12);
    doc.text(`Cliente: ${user?.displayName || "Cliente"}`, 14, 32);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 14, 40);

    let y = 50;

    doc.text("Producto", 14, y);
    doc.text("Cantidad", 80, y);
    doc.text("Precio Unitario", 110, y);
    doc.text("Total", 160, y);

    y += 6;

    ventaItems.forEach((item) => {
      doc.text(item.producto, 14, y);
      doc.text(String(item.cantidad), 80, y);
      doc.text(`C$${item.precio}`, 110, y);
      doc.text(`C$${item.total}`, 160, y);
      y += 8;
    });

    y += 10;
    doc.setFontSize(14);
    doc.text(`Total a pagar: C$${totalCompra}`, 14, y);

    doc.save("factura.pdf");
  };

  const procesarCompra = async () => {
    try {
      const ventasRef = collection(db, "ventas");

      const batch = carrito.map((producto) => {
        if (!producto.emprendedorUID || !producto.emprendedorNombre) {
          throw new Error(
            `El producto "${producto.nombre}" no tiene datos del emprendedor.`
          );
        }

        return {
          clienteUID: user?.uid || "anónimo",
          clienteNombre: user?.displayName || "Cliente",
          producto: producto.nombre,
          cantidad: producto.cantidad,
          precio: producto.precio,
          total: producto.precio * producto.cantidad,
          id_emprendedor: producto.emprendedorUID,
          emprendedorNombre: producto.emprendedorNombre,
          fecha: serverTimestamp(),
          metodo: metodoPago,
        };
      });

      for (const venta of batch) {
        await addDoc(ventasRef, venta);
      }

      generarFacturaPDF(batch, total);

      alert("Compra realizada con éxito");
      vaciarCarrito();
      setMostrarModalPago(false);
      setMetodoPago("");
      setMostrarFormularioPago(false);
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Ocurrió un error al procesar la compra. Ver consola.");
    }
  };

  const handlePago = () => {
    if (metodoPago === "efectivo") {
      procesarCompra();
    } else if (metodoPago === "tarjeta") {
      setMostrarFormularioPago(true);
    }
  };

  return (
    <div className="container mt-4">
      <br />
      <br />
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>C${item.precio}</td>
                  <td>C${item.precio * item.cantidad}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => eliminarProducto(item.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total: C${total}</h4>
          <Button variant="success" onClick={() => setMostrarModalPago(true)}>
            Pagar
          </Button>
        </>
      )}

      {/* Modal de selección de método de pago */}
      <Modal show={mostrarModalPago} onHide={() => setMostrarModalPago(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Selecciona el método de pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check
              type="radio"
              label="Pago en efectivo"
              name="metodoPago"
              value="efectivo"
              checked={metodoPago === "efectivo"}
              onChange={(e) => {
                setMetodoPago(e.target.value);
                setMostrarFormularioPago(false);
              }}
            />
            <Form.Check
              type="radio"
              label="Pago con tarjeta"
              name="metodoPago"
              value="tarjeta"
              checked={metodoPago === "tarjeta"}
              onChange={(e) => {
                setMetodoPago(e.target.value);
                setMostrarFormularioPago(false);
              }}
            />
          </Form>

          {mostrarFormularioPago && metodoPago === "tarjeta" && (
            <div className="mt-3">
              <StripeConfig>
                <FormularioPago monto={total} onPagoExitoso={procesarCompra} />
              </StripeConfig>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!mostrarFormularioPago && (
            <>
              <Button variant="secondary" onClick={() => setMostrarModalPago(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handlePago} disabled={!metodoPago}>
                Confirmar
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Carrito;