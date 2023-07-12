import React from 'react'
import Fotter from './Fotter'
import MenuTailwind from './MenuTailwind'
import { Link } from 'react-router-dom'
const Registro = () => {




    return (
        <div className='bg-gradient-to-tr from-cyan-200 to-violet-600'>
            <MenuTailwind/>
            <main className=' flex justify-center items-center min-h-screen'>
            <div className='bg-fondo6 bg-orange-200 w-44 h-44 absolute left-72 z-0'></div>
                <form action="" className=' bg-emerald-300 z-20 flex flex-col gap-6 md:w-1/2 landscape:md:w-1/2 landscape:m-auto m-auto  rounded-md p-8 opacity-75 bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg'>
                    <h1 className='text-3xl'>Crear Cuenta</h1>
                    <input type="text" placeholder="Nombre" className='rounded-md p-3 my-4 '  />
                    <div id='nombre'></div>
                    <input type="email" placeholder="Email" className='rounded-md p-3 my-4' />
                    <input type="pasword" placeholder="introduce tu contraseña" className='rounded-md p-3 my-4' />
                    <div>
                        <input type="checkbox" />
                        <label className=''> Acepto los terminos</label>
                    </div>
                    <div>
                        <p>Ya tienes cuenta? <Link to="/login" className='text-blue-600'>Iniciar session</Link> </p>
                    </div>
                    <button type="submit" className='md:w-40 bg-red-200 m-auto rounded-lg p-3 shadow-md focus:ring-4 hover:bg-sky-400'>Registrarse</button>
                    
                </form>
                <div className='bg-fondo5 bg-red-600 w-44 h-44 absolute right-72 z-0'></div>
            </main>
            <Fotter/>
        </div>
    )
}

export default Registro
