import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

const fetchData = async () => {
  try {
    const response = await client.get('/api/showTodayRecords/1');
    const data = response.data;

    const fechas = data.map((item) => item.fecha);
    const contentos = data.map((item) => item.contentos);
    const desanimados = data.map((item) => item.desanimados);

    var totalContentos = 0;
    var totalDesanimados = 0;

    contentos.forEach(function(contento){
      totalContentos += contento
    })

    desanimados.forEach(function(desanimado){
      totalDesanimados += desanimado
    })

    

    const grafico = {
      labels: ["Contentos", "Desanimados"],
      datasets: [
        {
          data: [totalContentos, totalDesanimados],
          backgroundColor: ["green", "red"],
        },
      ],
    };

    return grafico;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function GraficoDonutHoy() {
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
  };

  return <Doughnut data={chartData} options={options} />;
}