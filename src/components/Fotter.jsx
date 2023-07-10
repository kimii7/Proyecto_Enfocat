import React from 'react'
import email3 from '../assets/email3.png'
import telefono5 from '../assets/telefono5.png'
const Fotter = () => {
  return (
    <div>
      <footer className='bg-gray-800 mt-20'>
        <div className='flex flex-row justify-around items-center h-20'>
          <div className='text-white '> <img src={email3} alt="" className='w-[10vh] cursor-pointer' /></div>
          <div className='text-white '><img src={telefono5} alt="" className='w-[10vh] cursor-pointer' /></div>
          
        </div>
        <hr className='' />
        <div className='flex flex-row justify-around items-center h-20'>
          <div className='text-white '> <a href="#">Política de privacidad</a></div>
          <div className='text-white '><a href="#">Términos y condiciones</a></div>
          <div className='text-white '>© 2023 Mi Empresa. Todos los derechos reservados.</div>
          
        </div>
      </footer>
    </div>
  )
}

export default Fotter
