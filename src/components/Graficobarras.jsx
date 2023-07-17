import React from "react";
import { Bar } from "react-chartjs-2";

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
const data = {
  labels: ["Red", "Green", "Blue"],
  datasets: [
    {
      label: "Value",
      data: [12, 19, 6],
      backgroundColor: ["rgba(245, 40, 145, 0.3)", "green", "blue"],
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function GraficoBarras() {
  return <Bar data={data} options={options} />;
}
