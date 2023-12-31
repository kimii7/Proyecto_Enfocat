import { useMemo } from "react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend);

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

var usuario_id;

if(localStorage.getItem('usuario') != null){
  
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  usuario_id = usuario["user_id"]
}

  
const fetchData = async () => {
  try {
    const response = await client.get(`/api/showMonthRecords/${usuario_id}`);
    const data = response.data;

    const fecha = data.map((item) => { 
      return item.fecha.replace('T', ' ').slice(0, -6);
    });
    const contentos = data.map((item) => item.felicidad);
    const desanimados = data.map((item) => item.tristeza);
    const iracundos = data.map((item) => item.ira);
    const odiosos = data.map((item) => item.odio);
    const sorprendidos = data.map((item) => item.sorpresa);
    const neutrales = data.map((item) => item.neutral);

    const grafico = {
      labels: fecha,
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
          hidden: true,
        },
        {
          label: 'Ira',
          data: iracundos,
          tension: 0.4,
          borderColor: '#81A684',
          pointRadius: 6,
          pointBackgroundColor: '#0E0F19',
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          fill: true,
          hidden: true,
        },
        {
          label: 'Odio',
          data: odiosos,
          tension: 0.4,
          borderColor: '#81A684',
          pointRadius: 6,
          pointBackgroundColor: '#0E0F19',
          backgroundColor: 'rgba(200, 180, 180, 0.3)',
          fill: true,
          hidden: true,
        },
        {
          label: 'Sorprendidos',
          data: sorprendidos,
          tension: 0.4,
          borderColor: '#81A684',
          pointRadius: 6,
          pointBackgroundColor: '#0E0F19',
          backgroundColor: 'rgba(229, 190, 1, 0.3)',
          fill: true,
          hidden: true,
        },
        {
          label: 'Neutrales',
          data: neutrales,
          tension: 0.4,
          borderColor: '#81A684',
          pointRadius: 6,
          pointBackgroundColor: '#0E0F19',
          backgroundColor: 'rgba(101, 115, 126, 0.3)',
          fill: true,
          hidden: true,
        },
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
      x: {
        display:false,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Evolución del mes",
        font:{
          size: 35,
        }
      },

      filler: {
        propagate: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
