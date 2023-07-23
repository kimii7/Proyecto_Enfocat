import React from 'react'
import MenuTailwind from './MenuTailwind'
import escuela from '../assets/escuela.png'
import happy from '../assets/happy.png'
import tablet from '../assets/tablet.png'
// import fondo from '../assets/fondo.png'
import '../index.css'
import house from '../assets/house.png'
import migrafico from '../assets/migrafico.png'

import phone from '../assets/phone.png'
import email from '../assets/email.png'

import Fotter from './Fotter'
import dashboard from '../assets/dashboard.png'
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion';

import alumnos from '../assets/alumnos.jpg'
import profesor from '../assets/profesor.jpg'

import { fadeIn } from '../variants'

const PaginaInicio = () => {

  const contentos = 23;
  const desanimados = 7;
  const distraidos = 12;
  const ira = 3;
  const [ref, inView] = useInView({
    threshold: 0.5,
  })

  if (localStorage.getItem('usuario') != null) {
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + '/layout';
    window.location = baseUrl;
  }

  return (
    <div className='bg-gradient-to-r from-cyan-200 to-pink-300 ' ref={ref}>
      <div className=' '>
        <MenuTailwind />
        <main className='grid md:grid-cols-2 mt-40 md:mt-20 mx-10'>
          <div className='grid md:col-span-1 m-5 '>
            <motion.h1 variants={fadeIn('right', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.3 }} className='flex justify-center items-center text-[55px] font-bold leading-[0.8]  lg:text-[110px] text-indigo-400'>Mejora tus classes!</motion.h1>
            <p className='mt-20 md:mt-0 text-[20px] text-indigo-900'>A partir de ahora, podras saber el estado de animo de tus alumnos, y asi poder mejorar tus clases y organizar tua agenda. Tambien podras tener una vision futura de como seran tus clases.</p>
            <div className='md:grid md:grid-cols-4 gap-4 my-7 m-auto'>
              <div className='shadow-lg opacity-75 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl flex flex-col gap-2 h-40'><CountUp start={-20} end={contentos} duration={7} separator="," className='text-2xl mx-16' /> <br /> <p className='m-auto font-bold leading-[0.8] text-2xl text-green-600'>Contentos</p></div>
              <div className='shadow-lg opacity-75 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl flex flex-col gap-2 h-40'><CountUp start={-20} end={desanimados} duration={7} separator="," className='text-2xl mx-16' /> <br /> <p className='m-auto font-bold leading-[0.8] text-2xl text-orange-500'>desanimados</p></div>
              <div className='shadow-lg opacity-75 bg-opacity-10 backdrop-filter backdrop-blur-lg flex rounded-xl flex-col gap-2 h-40'><CountUp start={-20} end={distraidos} duration={7} separator="," className='text-2xl mx-16' /> <br /> <p className=' m-auto font-bold leading-[0.8] text-2xl  text-indigo-500'>distraidos</p></div>
              <div className='shadow-lg opacity-75 bg-opacity-10 backdrop-filter backdrop-blur-lg flex rounded-xl flex-col gap-2 h-40'><CountUp start={-20} end={ira} duration={7} separator="," className='text-2xl mx-16' /><br /> <p className='m-auto font-bold leading-[0.8] text-2xl text-red-600'>ira</p></div>
            </div>
          </div>
          <motion.div variants={fadeIn('left', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.3 }} className='grid md:col-span-1 bg-fondo2 bg-indigo-400'>
            <img src={escuela} alt='Escuela' />
          </motion.div>

          

        </main>

      </div>
      <div className=''>
        <section>
          <div className='flex justify-center items-center flex-col mt-20'>
            <h2 className='mb-10 text-[35px] font-bold leading-[0.8]  lg:text-[76px] text-indigo-400'>Nuestras ventajas</h2>
            <p className='p-10 ml-5'>Saca el maximo de partido de nuestra aplicación y Mejora tus classes.</p>
          </div>
        </section>
        <section className='grid md:grid-cols-3 mx-10 gap-5'>
          <motion.div variants={fadeIn('down', 0.3)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.3 }} className='group relative overflow-hidden border-2 border-white/50 rounded-xl h-96'>
            <div className='group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300'>

            </div>
            <img className='group-hover:scale-125 transition-all duration-500 h-full' src={dashboard} alt="" />
            <div className='absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50'>
              <span className='text-white'>Dashboard</span>
            </div>
            <div className='absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50'>
              <span className='text-3xl text-white'>Analiza los datos</span>
            </div>
          </motion.div>
          <motion.div variants={fadeIn('up', 0.3)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.3 }} className='group relative overflow-hidden border-2 border-white/50 rounded-xl h-96'>
            <div className='group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300'>

            </div>
            <img className='group-hover:scale-125 transition-all duration-500 h-full' src={alumnos} alt="" />
            <div className='absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50'>
              <span className='text-white'>Classe</span>
            </div>
            <div className='absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50'>
              <span className='text-3xl text-white'>Mejora tus clases</span>
            </div>
          </motion.div>
          <motion.div variants={fadeIn('down', 0.3)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.3 }} className='group relative overflow-hidden border-2 border-white/50 rounded-xl h-96'>
            <div className='group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300'>

            </div>
            <img className='group-hover:scale-125 transition-all duration-500 h-full w-full' src={profesor} alt="" />
            <div className='absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50'>
              <span className='text-white'>Reflexion</span>
            </div>
            <div className='absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50'>
              <span className='text-3xl text-white'>Usa tu criterio</span>
            </div>
          </motion.div>
        </section>
        <article className='mt-60'>
          <motion.div variants={fadeIn('right', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.3 }} className='ml-20'>
            <h3   className='text-[35px] font-bold leading-[0.8]  lg:text-[76px] text-indigo-400'>Que tan facíl es?</h3>
            <p className='mt-10 text-indigo-900'>Analiza los las estadisticas, y saca tus propias conclusiones. Segun la clase que estes impartiendo y el tipo de alumnos, <br /> implementa en tu dia a dia lo que veas necesario </p>
          </motion.div>

        </article>
        <article className='mt-20 grid md:grid-cols-2 mx-10 '>
          <motion.div variants={fadeIn('left', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.3 }} className='colspan-1 bg-fondo2 bg-amber-300' > <img className='' src={tablet} /> </motion.div>
          <div className='colspan-2 mt-40 p-8'>
            <h3 className='text-[25px] font-bold leading-[0.8]  lg:text-[46px] text-indigo-400 mb-5 '>Como puedes mejorar</h3>
            <p className='text-indigo-900'>Utilizando esta heramienta como soporte. Analiza que contenido les es mas interesante para tus alumnos.</p>
          </div>
        </article>
      </div>
      <Fotter />

    </div>
  );
};
export default PaginaInicio;


