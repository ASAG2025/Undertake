import React from 'react';
import { Card } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const GraficoVentasMensuales = ({ datos }) => {
  const labels = datos.map((item) => item.mes);
  const valores = datos.map((item) => item.total);

  const data = {
    labels,
    datasets: [
      {
        label: 'Total de Ventas (C$)',
        data: valores,
        backgroundColor: 'rgb(255, 99, 132)', // Color sólido
        borderColor: 'rgb(200, 50, 100)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ventas Mensuales',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Ventas (C$)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Mes',
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Card>
        <Card.Body>
          <Card.Title>Gráfico de Ventas</Card.Title>
          <Bar data={data} options={options} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default GraficoVentasMensuales;
