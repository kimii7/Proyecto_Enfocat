import React from 'react'
import MenuTailwind from './MenuTailwind'
import escuela from '../assets/escuela.png'
import mejora from '../assets/mejora.png'
import tablet from '../assets/tablet.png'
// import fondo from '../assets/fondo.png'
import '../index.css'
import casa from '../assets/casa.jpg'
import estadistica from '../assets/estadistica.jpg'

const PaginaInicio = () => {
  return (
    <div className='bg-gradient-to-r from-cyan-200 to-pink-300'>
      <div className=' '>
        <MenuTailwind />
        <main className='grid md:grid-cols-2 mt-40 md:mt-20 '>
          <div className='grid md:col-span-1 m-5 '>
            <h1 className='flex justify-center items-center text-3xl font-mono'>Mejora tus classes!</h1>
            <p className='mt-20 md:mt-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi minus fugit fuga exercitationem pariatur aut autem dignissimos dolorem. Voluptatibus ut molestiae molestias nobis explicabo minima asperiores doloremque dicta minus quo?</p>
          </div>
          <div className='grid md:col-span-1 bg-fondo2 bg-indigo-400'>
            <img src={escuela} alt='Escuela' />
          </div>
        </main>

      </div>
      <div className=''>
        <section>
          <div className='flex justify-center items-center flex-col mt-20'>
            <h2 className='mb-10 font-mono text-4xl'>Nuestras ventajas</h2>
            <p className='p-10 ml-5'>Saca el maximo de partido de nuestra aplicación y Mejora tus classes.</p>
          </div>
        </section>
        <section className='grid md:grid-cols-3 '>
          <div className='bg-indigo-300 rounded-lg flex flex-col gap-4 m-5 items-center justify-center shadow-md'>
            <img src={casa} className='w-40 p-8' />
            <h4>Paso 1</h4>
            <p className='p-8'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, incidunt?</p>
          </div>
          <div className='bg-indigo-300 rounded-lg flex flex-col gap-4 m-5 items-center justify-center shadow-md'>
            <img src={estadistica} className='w-40 p-8' />
            <h4>Paso 2</h4>
            <p className='p-8'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, incidunt?</p>
          </div>
          <div className='bg-indigo-300 rounded-lg flex flex-col gap-4 m-5 items-center justify-center shadow-md'>
            <img src={mejora} className='w-40 p-8' />
            <h4>Paso 3</h4>
            <p className='p-8'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, incidunt?</p>
          </div>
        </section>
        <article className='mt-60'>
          <div className='ml-20'>
            <h3 className='text-4xl font-mono'>Que tan facíl es?</h3>
            <p className='mt-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut quaerat ad aperiam quam voluptates</p>
          </div>

        </article>
        <article className='mt-20 grid md:grid-cols-2 '>
          <div className='colspan-1 bg-fondo2 bg-amber-300' > <img className='' src={tablet} /> </div>
          <div className='colspan-2 mt-40 p-8'>
            <h3 className='text-4xl mb-5 font-mono'>Como puedes mejorar</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis cumque eos quod expedita earum nulla ab suscipit reprehenderit voluptate blanditiis!</p>
          </div>
        </article>
      </div>

    </div>

  )
}

export default PaginaInicio
