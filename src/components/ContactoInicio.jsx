import React from 'react'
import MenuTailwind from './MenuTailwind'
import Fotter from './Fotter'


const ContactoInicio = () => {

  if (localStorage.getItem('usuario') != null) {
    var getUrl = window.location;
            var baseUrl = getUrl.protocol + "//" + getUrl.host + '/layout';
            window.location = baseUrl;
  }
  return (
    <div className='bg-gradient-to-r from-cyan-200 to-rose-300 min-h-screen'>
      <MenuTailwind />

      <main className='mt-60 '>

        <div className='bg-fondo4 bg-amber-300 m-auto md:flex flex'>
          
          <form action="" className=' bg-emerald-300 flex flex-col gap-6 md:w-1/2 landscape:md:w-1/2 landscape:m-auto m-auto  rounded-md p-8 opacity-75 bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg'>
            <input type="text" placeholder="Nombre" className='rounded-md p-3 my-4 ' />
            <input type="email" placeholder="Email" className='rounded-md p-3 my-4' />
            <textarea placeholder="Mensaje" className='h-40 resize-none rounded-md p-3 my-4' />
            <button type="submit" className='md:w-40 bg-red-400 m-auto rounded-lg p-3 shadow-md hover:bg-sky-400'>Enviar</button>
          </form>
        </div>
      



      </main>
      <Fotter />
    </div>
  )
}

export default ContactoInicio