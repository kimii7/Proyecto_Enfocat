import React, { useEffect, useState } from "react";

import axios from "axios";

export default function Selectasignatura() {

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});


// function elegirAsignaturaselect(e) {
//     console.log(miasignatura)
//     e.preventDefault();
//     client.post(
//       'api/post/asignatura',
//       {
//         usuario_id: usuario["user_id"],
//         nombre: miasignatura,

//         }
//     ).then(function (res) {
//       window.location.reload();
//     });
//   }

const [Asignaturas, setAsignaturas] = useState([]);

const getAsignaturas = async () => {
  try{
    const response = await client.get(`/api/asignaturas/1`)
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

    const chartData = {
      labels: ["Contentos", "Desanimados"],
      datasets: [
        {
          data: [totalContentos, totalDesanimados],
          backgroundColor: ["green", "red"],
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
      
    </div>
  );
}