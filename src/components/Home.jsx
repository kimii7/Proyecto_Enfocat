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


function Home() {
    return (
      <div className="bg-black">
        <div className="md:grid md:grid-cols-2 bg-black grid">
          <div className="bg-indigo-100 p-8 rounded-md m-5 md:col-span-1 col-span-2  shadow-md landscape-styles    ">
            <GraficoBarras />
          </div>
  
          <div className="bg-slate-100 p-8 rounded-md m-5 md:col-span-1 col-span-2 shadow-md landscape-styles">
            <Grafico />
          </div>
  
          <div className="bg-slate-100 p-8 rounded-md m-5 col-span-2 md:col-span-1 shadow-md landscape-styles">
            <GraficoLineasSemana />
          </div>
  
          <div className="bg-indigo-100 p-8 rounded-md m-5 col-span-2 md:col-span-1 shadow-md landscape-styles">
            <GraficoPastel />
          </div>
        </div>
  
        <div className="md:grid md:grid-cols-4">
          <div className="bg-indigo-100 p-8 rounded-md m-5 col-span-1 shadow-md landscape-styles">
            <h1 className="text-indigo-900 text-2xl text-center">Resumen</h1>
            <GraficoDonut />
          </div>
  
          <div className="bg-indigo-100 p-8 rounded-md m-5 col-span-1 shadow-md landscape-styles">
            <h1 className="text-indigo-900 text-2xl text-center">Semanal</h1>
            <GraficoDonutSemana />
          </div>
  
          <div className="bg-indigo-100 p-8 rounded-md m-5 col-span-1 shadow-md landscape-styles">
            <h1 className="text-indigo-900 text-2xl text-center">Hoy</h1>
            <GraficoDonutHoy />
          </div>
  
          <div className="bg-indigo-100 p-8 rounded-md m-5 col-span-1 shadow-md landscape-styles">
            <h1 className="text-indigo-900 text-2xl text-center">Mes</h1>
            <GraficoDonutMes />
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;
  