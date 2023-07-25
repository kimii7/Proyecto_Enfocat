import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

export default function GraficoLineasMes() {

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

var usuario_id;

if(localStorage.getItem('usuario') != null){
  
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  usuario_id = usuario["user_id"]
}

const [Asignaturas, setAsignaturas] = useState([]);
const getAsignaturas = async () => {
  try{
    const response = await client.get(`/api/asignaturas/${usuario_id}`)
    const data = response.data;
    const asignatura_id = data.map((item) => item.id);
    const asignatura_nombre = data.map((item) => item.nombre);

    var asignatura = [];

    for(let i=0; i < asignatura_id.length; i++){
      asignatura.push([asignatura_id[i], asignatura_nombre[i]]);
    }

    setAsignaturas(asignatura);

  } catch (error) {
    return null;
  }
}

useEffect(() => {
  getAsignaturas();
}, []);

  const fetchData = async (asignatura_Id) => {
  try {
    const response = await client.get(`/api/showByAsignatura`, { params: {usuario_id:1, asignatura_id:asignatura_Id}});
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

    const chartData = {
        labels: ["Contentos", "Desanimados", "Ira", "Odio", "Sorprendidos"],
        datasets: [
            {
                data: [totalContentos, totalDesanimados, totalIra, totalOdio, totalSorprendidos],
                backgroundColor: ["green", "blue", "red", "black", "yellow"],
            },
        ],
    };

    return chartData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

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
  };

  return (
    <div>
      <select value={selectedAsignatura} onChange={handleAsignaturaChange}>
        <option value="0">Seleccionar Asignatura</option>
        {Asignaturas.map((fila, elemento) => (
          <option value={fila[0]}>{fila[1]}</option>
        ))}
        {/* Agrega más opciones de asignaturas según tu caso */}
      </select>
      {chartData && <Pie data={chartData} options={options} />}
    </div>
  );
}