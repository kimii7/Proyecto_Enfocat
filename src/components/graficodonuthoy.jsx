import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

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
    const response = await client.get(`/api/showTodayRecords/${usuario_id}`);
    const data = response.data;

    const contentos = data.map((item) => item.felicidad);
    const desanimados = data.map((item) => item.tristeza);
    const iracundos = data.map((item) => item.ira);
    const odiosos = data.map((item) => item.odio);
    const sorprendidos = data.map((item) => item.sorpresa);
    const neutrales = data.map((item) => item.neutral);

    var totalContentos = 0;
    var totalDesanimados = 0;
    var totalIra = 0;
    var totalOdio = 0;
    var totalSorprendidos = 0;
    var totalNeutral = 0;

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

    neutrales.forEach(function (neutral) {
      totalNeutral += neutral
  })

    const grafico = {
        labels: ["Contentos", "Desanimados", "Ira", "Odio", "Sorprendidos", "Neutral"],
        datasets: [
            {
                data: [totalContentos, totalDesanimados, totalIra, totalOdio, totalSorprendidos, totalNeutral],
                backgroundColor: ["green", "blue", "red", "black", "yellow", "gray"],
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