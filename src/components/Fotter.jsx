import React from 'react'
import phone from '../assets/phone.png'
import email from '../assets/email.png'
const Fotter = () => {
  return (
    <div>
      <footer className='bg-gray-800 mt-20'>
        <div className='flex flex-row justify-around items-center h-20'>
          <div className='text-white '> <img src={phone} alt="" className='w-10'/>  </div>
          <div className='text-white '> <img src={email} alt="" className='w-10 text-white'/></div>
          
        </div>
        <hr className='' />
        <div className='flex flex-row justify-around items-center h-20'>
          <div className='text-white ml-3'> <a href="#">Política de privacidad</a></div>
          <div className='text-white '><a href="#">Términos y condiciones</a></div>
          <div className='text-white '>© 2023 Todos los derechos reservados.</div>
          
        </div>
      </footer>
    </div>
  )
}

export default Fotter
