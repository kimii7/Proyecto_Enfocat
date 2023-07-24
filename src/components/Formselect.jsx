import React from 'react'
import Selectasignatura from './Formselectasignatura';
// Initialization for ES Users
import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";

initTE({ Modal, Ripple });

import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const usuario = JSON.parse(localStorage.getItem('usuario'));

import axios from "axios";

export default function GraficoPastel() {


    const client = axios.create({
        baseURL: 'http://127.0.0.1:8000'
    });

    // const [miasignatura_id, setmMiasignatura] = useState('');

    function elegirAsignaturaselect(e) {
        var miasignatura = localStorage.getItem('miasignatura');
        e.preventDefault();
        client.post(
          'api/post/record',
          {
            usuario_id: usuario["user_id"],
            profesor_id: selectedProfesor,
            asignatura_id: miasignatura,
    
            }
        ).then(function (res) {
            localStorage.removeItem('miasignatura')
            window.location.reload();
        });
      }

    const [Profesores, setProfesores] = useState([]);

    const getProfesores = async () => {
        try {
            const response = await client.get(`/api/profesores/1`)
            const data = response.data;
            const profesor_id = data.map((item) => item.id);
            const profesor_nombre = data.map((item) => item.nombre);
            const profesor_apellido = data.map((item) => item.apellido);

            var profesor = [];

            for (let i = 0; i < profesor_id.length; i++) {
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
            const response = await client.get('/api/showByTeacher', { params: { usuario_id: 1, profesor_id: profesor_id } });
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

    const [chartData, setChartData] = useState(null);
    const [selectedProfesor, setSelectedProfesor] = useState("");

    const handleProfesorChange = (event) => {
        setSelectedProfesor(event.target.value)
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
        <>
            <div>

                <button
                    type="button"
                    class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-toggle="modal"
                    data-te-target="#exampleModal5"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    Launch demo modal
                </button>


                <div
                    data-te-modal-init
                    className="fixed  left-0 top-60 w-[90%] rounded-md  mx-5 z-[1055] hidden h-full  overflow-y-auto overflow-x-hidden outline-none"
                    id="exampleModal5"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div
                        data-te-modal-dialog-ref
                        className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
                        <div
                            class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-indigo-500">
                            <div
                                class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">

                                <h5
                                    class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                                    id="exampleModalLabel">
                                    Modal title
                                </h5>
                                
                                <button
                                    type="button"
                                    class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                    data-te-modal-dismiss
                                    aria-label="Close">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="h-6 w-6">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>


                            <div class="relative flex-auto p-4" data-te-modal-body-ref>
                            <article>
                                    <div className='flex'>
                                        <select className='flex-1 mx-5' value={selectedProfesor} onChange={handleProfesorChange}>
                                            <option value="0">Seleccionar Profesor</option>
                                            {Profesores.map((fila, elemento) => (
                                                <option value={fila[0]} >{fila[1]} </option>
                                            ))}
                                            {/* Agrega más opciones de asignaturas según tu caso */}
                                        </select>
                                        <Selectasignatura  />

                                    </div>
                                </article>
                            </div>


                            <div
                                class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                <button
                                    type="button"
                                    class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                    data-te-modal-dismiss
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    Close
                                </button>
                                <button
                                    onClick={elegirAsignaturaselect}
                                    type="button"
                                    class="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

