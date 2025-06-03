import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";

const FormularioPago = ({ monto, onPagoExitoso }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        address: {
          postal_code: "12345", // Puedes cambiar esto o agregar un input personalizado
        },
      },
    });

    if (!stripeError) {
      console.log("Pago simulado exitoso:", paymentMethod);
      onPagoExitoso(); // Procesa la venta en Firebase y genera factura
    } else {
      console.error("Error en el pago:", stripeError);
      setError(stripeError.message);
    }

    setCargando(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
          hidePostalCode: false, // 👈 Esto hace visible el campo ZIP
        }}
      />
      <Button type="submit" className="mt-3" disabled={!stripe || cargando}>
        {cargando ? "Procesando..." : `Pagar C$${monto}`}
      </Button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </form>
  );
};

export default FormularioPago;