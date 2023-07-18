import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

const fetchData = async (asignatura_Id) => {
  try {
    const response = await client.get(`/api/showMonthRecords/${asignatura_Id}`);
    const data = response.data;
    console.log(data[0]['fecha']);

    const fechas = data.map((item) => item.fecha);
    const contentos = data.map((item) => item.contentos);
    const desanimados = data.map((item) => item.desanimados);

    console.log(fechas);
    console.log(contentos);
    console.log(desanimados);

    const chartData = {
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
        },
      ],
    };

    return chartData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function GraficoLineasMes() {
  const [chartData, setChartData] = useState(null);
  const [selectedAsignatura, setSelectedAsignatura] = useState("");

  const handleAsignaturaChange = (event) => {
    setSelectedAsignatura(event.target.value);
  };

  const fetchDataAndSetChartData = async () => {
    const data = await fetchData(selectedAsignatura);
    setChartData(data);
  };

  useEffect(() => {
    fetchDataAndSetChartData();
  }, [selectedAsignatura]);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div>
      <select value={selectedAsignatura} onChange={handleAsignaturaChange}>
        <option value="">Seleccionar Asignatura</option>
        <option value="1">Asignatura 1</option>
        <option value="2">Asignatura 2</option>
        {/* Agrega más opciones de asignaturas según tu caso */}
      </select>
      <button onClick={fetchDataAndSetChartData}>Filtrar</button>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  );
}