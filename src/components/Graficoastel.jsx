import  { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


import axios from "axios";

export default function GraficoPastel() {

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

const [Profesores, setProfesores] = useState([]);

var usuario_id;

if(localStorage.getItem('usuario') != null){
  
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  usuario_id = usuario["user_id"]
}

const getProfesores = async () => {
  try{
    const response = await client.get(`/api/profesores/${usuario_id}`);
    const data = response.data;
    const profesor_id = data.map((item) => item.id);
    const profesor_nombre = data.map((item) => item.nombre);
    const profesor_apellido = data.map((item) => item.apellido);

    var profesor = [];

    for(let i=0; i < profesor_id.length; i++){
      profesor.push([profesor_id[i], profesor_nombre[i] + " " + profesor_apellido[i]]);
    }

    setProfesores(profesor);

  } catch (error) {
    return null;
  }
}

useEffect(() => {
  getProfesores();
}, []);

const fetchData = async (profesor_id) => {
  try {
    const response = await client.get('/api/showByTeacher', {params: {usuario_id:1, profesor_id:profesor_id}});
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

  const [chartData, setChartData] = useState(null);
  const [selectedProfesor, setSelectedProfesor] = useState("");

    const handleProfesorChange = (event) => {
    setSelectedProfesor(event.target.value);
  };

  const fetchDataAndSetChartData = async () => {
    const data = await fetchData(selectedProfesor);
    setChartData(data);
  };

  useEffect(() => {
    fetchDataAndSetChartData();
  }, [selectedProfesor]);

  const options = {
    responsive: true,
  };

  return (
    <div>
      <select value={selectedProfesor} onChange={handleProfesorChange}>
        <option value="0">Seleccionar Profesor</option>
        {Profesores.map((fila, elemento) => (
          <option value={fila[0]}>{fila[1]}</option>
        ))}
        {/* Agrega más opciones de asignaturas según tu caso */}
      </select>
      {chartData && <Pie data={chartData} options={options} />}
    </div>
    );
}