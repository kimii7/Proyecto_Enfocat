import { useState } from 'react';
import Formselect from './Formselect';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Ripple, initTE } from 'tw-elements';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = 'true';
const usuario = JSON.parse(localStorage.getItem('usuario'));
const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

// asignatura = document.getElementById('asignatura').value;
const Navbar = () => {
  const [miasignatura, setmMiasignatura] = useState('');
  const [nombre, setNombre] = useState ('');
  const [apellidos, setApellidos] = useState ('');

  useEffect(() => {
    initTE({ Modal, Ripple });
  }, []);

  const logout = () => {
    localStorage.removeItem('usuario');
    const baseUrl = window.location.protocol + '//' + window.location.host + '/';
    window.location.href = baseUrl;
  };

  // urlAsignatura = 'api/post/asignatura'
  // urlProfesor = 'api/post/profesor'
  function elegirAsignatura(e) {
    console.log(miasignatura)
    e.preventDefault();
    client.post(
      'api/post/asignatura',
      {
        usuario_id: usuario["user_id"],
        nombre: miasignatura,

        }
    ).then(function (res) {
      window.location.reload();
    });
  }

  function elNombre(e) {
    console.log(nombre)
    console.log(apellidos)
    e.preventDefault();
    client.post(
      'api/post/profesor',
      {
        usuario_id: usuario["user_id"],
        nombre: nombre,
        apellido: apellidos,
        }
    ).then(function (res) {
      window.location.reload();
    });
  }

  const nombreUsuario = usuario['username'];
  const email = usuario['email'];
  

  return (
    <div>
      <div className="bg-indigo-900 h-full fixed lg:w-[20%] w-[80%] left-0 top-0">
        <div className="h-[30vh] flex justify-center p-7 flex-col text-center items-center gap-4">
          
          <h1 className="text-2xl text-white font-bold">{nombreUsuario}</h1>
          <p className="text-white bg-primary-100 py-1 px-3 rounded-full">{email}</p>
        </div>
        <div className="h-[70vh] p-8 rounded-tr-full bg-indigo-500 flex flex-col justify-between gap-8">
          <nav>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center">
                <Link
                  className="text-white flex items-center py-2 px-4 rounded-xl transition-all hover:bg-indigo-900 gap-4"
                  to="/layout"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  className="text-white flex items-center py-2 px-4 rounded-xl transition-all hover:bg-indigo-900 gap-4"
                  to="/layout/about"
                >
                  Calendario
                </Link>
              </li>

            </ul>
          </nav>
          <div className='flex flex-col gap-4'>
            <a
              href="#"
              className="inline-block rounded-md bg-primary hover:bg-indigo-900 px-6 pb-2 pt-2.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-toggle="modal"
              data-te-target="#exampleModal"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Asignatura
            </a>
            <a
              href="#"

              className="inline-block rounded-md bg-primary hover:bg-indigo-900 px-6 pb-2 pt-2.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-toggle="modal"
              data-te-target="#exampleModal2"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Professor
            </a>

            <a href="#"> <Formselect/></a>
          </div>
          <div className="bg-indigo-700 p-4 rounded-xl shadow-md flex justify-center w-40">
            <a className="text-white text-center cursor-pointer" onClick={logout}>
              Log out
            </a>
          </div>
           
        </div>
      </div>

      <form
        data-te-modal-init
        className="fixed  left-0 top-60 w-[90%] rounded-md  mx-5  z-[1055] hidden h-full  overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none border  relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)]   pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-indigo-500">
            <div className="flex flex-shrink-0 items-center justify-between  rounded-tr-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5 className="text-xl p-7 font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="exampleModalLabel">
                Asignatura
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative flex-auto p-4" data-te-modal-body-ref>
              Nombre de la asignatura
              <input type="text" id='asignatura' className='rounded-md p-2 ml-5' value={miasignatura}
                onChange={(e) => setmMiasignatura(e.target.value)} />
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Close
              </button>
              <button
                onClick={elegirAsignatura}
                type="submit"
                className="ml-1 inline-block rounded bg-sky-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-sky-300 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </form>
      <form
        data-te-modal-init
        className="fixed  left-0 top-60 w-[90%]   mx-5 z-[1055]   hidden h-full  overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none border relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)]   pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-indigo-400">
            <div className="flex flex-shrink-0 items-center justify-between rounded-tr-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5 className="text-xl p-7 font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="exampleModalLabel">
                Professor
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative flex-auto p-4" data-te-modal-body-ref>
              <p>Introduce el nombre</p>
              <input type="text" className='rounded-md p-2 ml-5 my-5' value={nombre}
                onChange={(e) => setNombre(e.target.value)}/>
              <p>Introduce los apellidos</p>
              <input type="text" className='rounded-md p-2 ml-5 my-5' value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}/>
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Close
              </button>
              <button
              onClick={elNombre}
                type="submit"
                className="ml-1 inline-block rounded bg-sky-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-sky-300 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Navbar;


