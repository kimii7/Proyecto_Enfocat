import React from 'react'
import phone from '../assets/phone.png'
import email from '../assets/email.png'
import github from '../assets/github.png'
const Fotter = () => {
  return (
    <div>
      <footer className='bg-neutral-700 mt-20'>
        <div className='flex flex-row justify-around items-center h-10'>
        <div className='text-white sm:3/3 md:w-3/5'> </div>
          <div className='text-white flex flex-row gap-10'> <img src={phone} alt="" className='w-7' /> <img src={email} alt="" className='w-7 text-white' /> <img src={github} alt="" className='w-7' /></div>
          

        </div>
        {/* <hr className='' /> */}
        <div className='flex flex-row justify-around items-center gap-4 h-20'>
          <div className='text-white ml-3'> <a href="#">Política de privacidad</a></div>
          
          <div className='text-white '><a href="#">Términos y condiciones</a></div>


        </div>
        <div className='flex flex-row justify-around items-center gap-4 h-20 mt-4'>
          <div className='text-white ml-3'>  <a href="https://www.linkedin.com/in/daniel-python/" target='_blank'>Daniel Ferrer </a></div>
          <div className='text-white /3'><a href="https://www.linkedin.com/in/ivan-ariza-huertas-94346b263/" target='_blank' >Ivan Ariza</a> </div>
          <div className='text-white '> <a href="https://www.linkedin.com/in/evascor/" target='_blank'>Elisabet Vasco</a></div>


        </div>
        
        <div class="bg-neutral-800 p-6 text-center dark:bg-neutral-800">
          <span className='text-neutral-400'>© 2023 Copyright:</span>
          <a
            class="font-semibold text-neutral-600 dark:text-neutral-400"
            href="https://tailwind-elements.com/"
          >Clean code</a>
        </div>
      </footer>
    </div>
  )
}

export default Fotter
