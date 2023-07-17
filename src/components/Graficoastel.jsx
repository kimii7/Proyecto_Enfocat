import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const url = 'https://pokeapi.co/api/v2/pokemon/pikachu';

export default function GraficoPastel() {
  const [pokeData, setPokeData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // Aquí puedes procesar los datos obtenidos y extraer la información necesaria
        const abilities = data.abilities.map(ability => ability.ability.name);
        const baseExperience = data.base_experience;
        const height = data.height;
        const weight = data.weight;

        // Aquí actualizamos el estado con los datos procesados
        setPokeData({
          abilities,
          baseExperience,
          height,
          weight
        });
      })
      .catch(err => console.error(err));
  }, []);

  

  const data = {
    labels: ["Abilities", "Base Experience", "Height", "Weight"],
    datasets: [
      {
        data: pokeData ? [pokeData.abilities.length, pokeData.baseExperience, pokeData.height, pokeData.weight] : [],
        backgroundColor: ["red", "green", "blue", "yellow"],
        borderColor: "white",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    tooltips: {
      callbacks: {
        label: function (context) {
          const label = context.label || "";
          const value = context.raw || 0;
          return label + ": " + value;
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
}
