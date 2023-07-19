import { useMemo } from "react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend);

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

const fetchData = async () => {
  try {
    const response = await client.get('/api/showMonthRecords/1');
    const data = response.data;
    console.log(data[0]['fecha']);

    const fechas = data.map((item) => item.fecha);
    const contentos = data.map((item) => item.contentos);
    const desanimados = data.map((item) => item.desanimados);

    console.log(fechas);
    console.log(contentos);
    console.log(desanimados);

    const grafico = {
      labels: fechas,
      datasets: [
        {
          label: 'Contentos',
          data: contentos,
          tension: 0.4,
          borderColor: '#81A684',
          pointRadius: 6,
          pointBackgroundColor: '#0E0F19',
          backgroundColor: 'rgba(135, 165, 255, 0.3)',
          fill: true,
        },
        {
          label: 'Desanimados',
          data: desanimados,
          tension: 0.4,
          borderColor: '#81A684',
          pointRadius: 6,
          pointBackgroundColor: '#0E0F19',
          backgroundColor: 'rgba(135, 31, 255, 0.8)',
          fill: true,
        }
      ],
    };

    return grafico;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function GraficoLineasMes() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDataAndSetChartData = async () => {
      const data = await fetchData();
      setChartData(data);
    };

    fetchDataAndSetChartData();
  }, []);

  if (!chartData) {
    return null;
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      filler: {
        propagate: false,
      },
    },
  };

  console.log(chartData);
  return <Line data={chartData} options={options} />;
}