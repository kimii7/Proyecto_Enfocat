import React from 'react'
import Fotter from './Fotter'
import MenuTailwind from './MenuTailwind'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = 'true';

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

const Registro = () => {

    if (localStorage.getItem('usuario') != null) {
        var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host + '/layout';
                window.location = baseUrl;
    }

    // useEffect(() => {
    //     client.get('/api/user')
    //         .then((res) => {
    //             setCurrentUser(true);
    //         })
    //         .catch(function (error) {
    //             setCurrentUser(false);
    //         });
    // }, []);

    const [currentuser, setCurrentUser] = useState();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function Registrarse(e) {
        console.log(email)
        e.preventDefault();
        client.post(
            '/api/register',
            {
                email: email,
                username: username,
                password: password
            }
        ).then(function (res) {
            client.post(
                '/api/login',
                {
                    email: email,
                    password: password
                }

            ).then(function (res) {
                localStorage.setItem('usuario', JSON.stringify(res.data));

                // var usuario=localStorage.getItem('usuario');
                // var objeto = JSON.parse(usuario.toString());
                // console.log(objeto.user_id);
                // window.location = "http://localhost:5174/layout";
                var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host + '/layout';
                window.location = baseUrl;
            })
        });
    }

    function logearse(e) {
        e.preventDefault();
        client.post(
            '/api/login',
            {
                email: email,
                password: password
            }
        ).then(function (res) {
            setCurrentUser(true);
        });
    }

    function logout(e) {
        e.preventDefault();
        client.post(
            '/api/logout',
            { whithCredentials: true }
        ).then(function (res) {
            setCurrentUser(false);
        })
    }
    return (
        <div className='bg-gradient-to-tr from-cyan-200 to-violet-600'>
            <MenuTailwind />
            <main className=' flex justify-center items-center min-h-screen'>
                <div className='bg-fondo6 bg-orange-200 w-44 h-44 absolute left-72 z-0'></div>
                <form action="" className=' bg-emerald-300 z-20 flex flex-col gap-6 md:w-1/2 landscape:md:w-1/2 landscape:m-auto m-auto  rounded-md p-8 opacity-75 bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg'>
                    <h1 className='text-3xl'>Crear Cuenta</h1>
                    <input type="text" placeholder="Nombre" className='rounded-md p-3 my-4 ' value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    <div id='nombre'></div>
                    <input type="email" placeholder="Email" className='rounded-md p-3 my-4' value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input type="pasword" placeholder="introduce tu contraseña" className='rounded-md p-3 my-4' value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <div>
                        <input type="checkbox" />
                        <label className=''> Acepto los terminos</label>
                    </div>
                    <div>
                        <p>Ya tienes cuenta? <Link to="/login" className='text-blue-600'>Iniciar session</Link> </p>
                    </div>
                    <button type="submit" onClick={Registrarse} className='md:w-40 bg-red-200 m-auto rounded-lg p-3 shadow-md focus:ring-4 hover:bg-sky-400'>Registrarse</button>

                </form>
                <div className='bg-fondo5 bg-red-600 w-44 h-44 absolute right-72 z-0'></div>
            </main>
            <Fotter />
        </div>
    )
}

export default Registro
