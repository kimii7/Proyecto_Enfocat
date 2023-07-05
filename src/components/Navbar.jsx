import React from 'react'

import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>

      <div className='bg-indigo-900 h-full fixed    lg:w-[20%]   w-[80%] left-0 top-0 '>
        <div className='h-[30vh] flex justify-center p-7 flex-col text-center items-center gap-4'>
          <img src='https://st.depositphotos.com/1008939/1316/i/950/depositphotos_13163725-stock-photo-young-man.jpg' className='w-20 h-20 object-cover rounded-full ring-2 ring-orange-200'></img>
          <h1 className='text-2xl text-white font-bold '>Daniel Ferrer</h1>
          <p className='text-white bg-primary-100 py-1 px-3 rounded-full'>Mi perfil</p>
        </div>
        <div className='h-[70vh] p-8 rounded-tr-full bg-indigo-500 flex flex-col justify-between gap-8'>
          <nav>
            <ul className='flex flex-col gap-4'>
              <li className='flex items-center'> <Link className='text-white  flex items-center py-2 px-4 rounded-xl transition-all  hover:bg-indigo-900 gap-4' to='/'>Home</Link></li>
              <li className='flex items-center'> <Link className='text-white  flex items-center py-2 px-4 rounded-xl transition-all  hover:bg-indigo-900 gap-4' to='/about'>Informes</Link> </li>
              <li className='flex items-center'><Link className='text-white  flex items-center py-2 px-4 rounded-xl transition-all  hover:bg-indigo-900 gap-4' to='/contact'>Resumen</Link> </li>
            </ul>
          </nav>
          <div className='bg-indigo-700 p-4 rounded-xl shadow-md'>
            <p className='text-white'>mis cosas</p>
            <a className='text-white' href="#" >Contactanos</a>
          </div>
          
        </div>

      </div>
      
    </div>
  )
}

export default Navbar

