import React from 'react'

const Login = () => {
  return (
    <div>
      <main className='bg-gradient-to-b from-orange-400 to-violet-400 flex justify-center items-center min-h-screen'>
            <div className='bg-fondo6 bg-orange-200 w-44 h-44 absolute left-72 z-0'></div>
                <form action="" className=' bg-emerald-300 z-20 flex flex-col gap-6 md:w-1/2 landscape:md:w-1/2 landscape:m-auto m-auto  rounded-md p-8 opacity-75 bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg'>
                    
                    <input type="email" placeholder="Email" className='rounded-md p-3 my-4' />
                    <input type="pasword" placeholder="introduce tu contraseña" className='rounded-md p-3 my-4' />
                    <button type="submit" className='md:w-40 bg-indigo-700 m-auto rounded-lg p-3 shadow-md focus:ring-4'>iniciar sesion</button>
                </form>
                <div className='bg-fondo5 bg-red-500 w-44 h-44 absolute right-72 z-0'></div>
            </main>
    </div>
  )
}

export default Login
