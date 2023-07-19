import React from 'react'
import Dropdown from './Dropdawn'
import Grafico from './Graficolineames'

import GraficoPastel from './Graficoastel'

import GraficoBarras from './Graficobarras'
import GraficoDonut from './Graficodonut'

import GraficoDonutSemana from './Graficodonutsemana'
import GraficoDonutHoy from './graficodonuthoy'
import GraficoDonutMes from './Graficodonutmes'
import GraficoLineasSemana from './Graficolineasemana'
import html2canvas from "html2canvas";
import  { useState, useEffect } from "react";


function Home() {

  const [graphImage, setGraphImage] = useState(null);

  const captureImage = () => {
    const graphContainer = document.getElementById('graphContainer');

    html2canvas(graphContainer).then((canvas) => {
      const graphImage = canvas.toDataURL('image/png');
      const currentDate = new Date().toISOString().split('T')[0];

      localStorage.setItem(`graphImage_${currentDate}`, graphImage);
      setGraphImage(graphImage);
    });
  };

  return (
    <div className="bg-stone-100" id="graphContainer">
      <div className="md:grid md:grid-cols-2 bg-stone-100 grid">
        <div className="bg-indigo-100 p-8 rounded-md m-5 md:col-span-1 col-span-2  shadow-lg landscape-styles    ">
          <Dropdown className="bg-slate-100 hover:bg-slate-50" />
          <GraficoBarras />
        </div>

        <div className="bg-indigo-100 p-8 rounded-md m-5 md:col-span-1 col-span-2 shadow-lg landscape-styles">
          <Grafico />
        </div>

        <div className="bg-indigo-100 p-8 rounded-md m-5 col-span-2 md:col-span-1 shadow-lg landscape-styles">
          <GraficoLineasSemana />
        </div>

        <div className="bg-indigo-100 p-8 rounded-md m-5 col-span-2 md:col-span-1 shadow-lg landscape-styles">
          <Dropdown className="bg-slate-100 hover:bg-slate-50" />
          <GraficoPastel />
        </div>
      </div>

      <div className="md:grid md:grid-cols-4">
        <div className="bg-indigo-100 p-8 rounded-md m-5 col-span-1 shadow-lg landscape-styles">
          <h1 className="text-indigo-900 text-2xl text-center">Resumen</h1>
          <GraficoDonut />
        </div>

        <div className="bg-indigo-100 p-8 rounded-md m-5 col-span-1 shadow-lg landscape-styles">
          <h1 className="text-indigo-900 text-2xl text-center">Semanal</h1>
          <GraficoDonutSemana />
        </div>

        <div className="bg-indigo-100 p-8 rounded-md m-5 col-span-1 shadow-lg landscape-styles">
          <h1 className="text-indigo-900 text-2xl text-center">Hoy</h1>
          <GraficoDonutHoy />
        </div>

        <div className="bg-indigo-100 p-8 rounded-md m-5 col-span-1 shadow-lg landscape-styles">
          <h1 className="text-indigo-900 text-2xl text-center">Mes</h1>
          <GraficoDonutMes />
        </div>
        <button className='bg-white' onClick={captureImage}>Capturar imagen</button>
      </div>
    </div>
  );
}

export default Home;
