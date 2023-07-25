import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

if(localStorage.getItem('usuario') != null){
  
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const usuario_id = usuario["user_id"]
}
const fetchData = async () => {
  try {
    const response = await client.get(`/api/showMonthsRecords/${usuario_id}`);
    const data = response.data;

    const contentos = data.map((item) => item.felicidad);
    const desanimados = data.map((item) => item.tristeza);
    const iracundos = data.map((item) => item.ira);
    const odiosos = data.map((item) => item.odio);
    const sorprendidos = data.map((item) => item.sorpresa);

    var totalContentos = 0;
    var totalDesanimados = 0;
    var totalIra = 0;
    var totalOdio = 0;
    var totalSorprendidos = 0;

    contentos.forEach(function (contento) {
        totalContentos += contento
    })

    desanimados.forEach(function (desanimado) {
        totalDesanimados += desanimado
    })

    iracundos.forEach(function (ira) {
        totalIra += ira
    })

    odiosos.forEach(function (odio) {
        totalOdio += odio
    })

    sorprendidos.forEach(function (sorprendido) {
        totalSorprendidos += sorprendido
    })

    const grafico = {
        labels: ["Contentos", "Desanimados", "Ira", "Odio", "Sorprendidos"],
        datasets: [
            {
                data: [totalContentos, totalDesanimados, totalIra, totalOdio, totalSorprendidos],
                backgroundColor: ["green", "blue", "red", "black", "yellow"],
            },
        ],
    };

    return grafico;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function GraficoDonutMes() {
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