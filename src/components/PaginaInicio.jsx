import React from 'react'
import MenuTailwind from './MenuTailwind'
import escuela from '../assets/escuela.png'
import happy from '../assets/happy.png'
import tablet from '../assets/tablet.png'
// import fondo from '../assets/fondo.png'
import '../index.css'
import house from '../assets/house.png'
// import migrafico from '../assets/migrafico.png'

import phone from '../assets/phone.png'
import email from '../assets/email.png'

import Fotter from './Fotter'

const PaginaInicio = () => {

  if (localStorage.getItem('usuario') != null) {
    var getUrl = window.location;
            var baseUrl = getUrl.protocol + "//" + getUrl.host + '/layout';
            window.location = baseUrl;
  }
  
  return (
    <div className='bg-gradient-to-r from-cyan-200 to-pink-300 '>
      <div className=' '>
        <MenuTailwind />
        <main className='grid md:grid-cols-2 mt-40 md:mt-20 mx-10'>
          <div className='grid md:col-span-1 m-5 '>
            <h1 className='flex justify-center items-center text-4xl font-mono letra'>Mejora tus classes!</h1>
            <p className='mt-20 md:mt-0'>A partir de ahora, podras saber el estado de animo de tus alumnos, y asi poder mejorar tus clases y organizar tua agenda. Tambien podras tener una vision futura de como seran tus clases.</p>
          </div>
          <div className='grid md:col-span-1 bg-fondo2 bg-indigo-400'>
            <img src={escuela} alt='Escuela' />
          </div>
        </main>

      </div>
      <div className=''>
        <section>
          <div className='flex justify-center items-center flex-col mt-20'>
            <h2 className='mb-10 font-mono text-4xl letra'>Nuestras ventajas</h2>
            <p className='p-10 ml-5'>Saca el maximo de partido de nuestra aplicación y Mejora tus classes.</p>
          </div>
        </section>
        <section className='grid md:grid-cols-3 mx-10'>
          <div className='bg-indigo-900 rounded-lg flex flex-col gap-4 m-5 items-center justify-center shadow-lg opacity-75 bg-opacity-10 backdrop-filter backdrop-blur-lg '>
            <img src={house} className='w-40 p-8' />
            <h4>Paso 1</h4>
            <p className='p-8'>Familiarizate con la App y explora sus recursos</p>
          </div>
          {/* <div className='bg-indigo-900 rounded-lg flex flex-col gap-4 m-5 items-center justify-center shadow-lg opacity-75 bg-opacity-10 backdrop-filter backdrop-blur-lg'>
            <img src={migrafico} className='w-40 p-8' />
            <h4>Paso 2</h4>
            <p className='p-8'> Analiza los datos, y saca tus propias conclusiones</p>
          </div> */}
          <div className='bg-indigo-900 rounded-lg flex flex-col gap-4 m-5 items-center justify-center shadow-lg opacity-75 bg-opacity-10 backdrop-filter backdrop-blur-lg'>
            <img src={happy} className='w-40 p-8' />
            <h4>Paso 3</h4>
            <p className='p-8'>Saca la mejor version de tus alumnos</p>
          </div>
        </section>
        <article className='mt-60'>
          <div className='ml-20'>
            <h3 className='text-4xl font-mono'>Que tan facíl es?</h3>
            <p className='mt-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut quaerat ad aperiam quam voluptates</p>
          </div>

        </article>
        <article className='mt-20 grid md:grid-cols-2 mx-10 '>
          <div className='colspan-1 bg-fondo2 bg-amber-300' > <img className='' src={tablet} /> </div>
          <div className='colspan-2 mt-40 p-8'>
            <h3 className='text-4xl mb-5 font-mono'>Como puedes mejorar</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis cumque eos quod expedita earum nulla ab suscipit reprehenderit voluptate blanditiis!</p>
          </div>
        </article>
      </div>
      <Fotter/>

    </div>
  );
};
export default PaginaInicio;


