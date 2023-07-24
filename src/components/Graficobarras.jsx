import React from "react";
import { Bar } from "react-chartjs-2";
import axios from 'axios';
import  { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const client = axios.create({
    baseURL: 'http://127.0.0.1:8000'
  });
  
  const fetchData = async () => {
    try {
      const response = await client.get('/api/showMonthRecords/1');
      const data = response.data;

      const contentos = data.map((item) => item.felicidad);
      const desanimados = data.map((item) => item.ira);

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
      plugins: {
        title: {
          display: true,
          text: "Resumen del mes",
          font:{
            size: 35,
          }
        }
      }
    };
    return   <Bar data={chartData} options={options} className="w-screen"/>;
  }
