import React, { useState } from 'react';
import MenuTailwind from './MenuTailwind';
import Fotter from './Fotter';

import { Link } from 'react-router-dom';




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTermsAcceptedChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación del formulario
    if (email === '') {
      alert('Por favor, introduce tu email');
      return;
    }

    if (password === '') {
      alert('Por favor, introduce tu contraseña');
      return;
    }

    if (!termsAccepted) {
      alert('Debes aceptar los términos');
      return;
    }

    // Envío del formulario
    // Aquí puedes realizar la lógica para enviar los datos a tu backend o realizar otras acciones necesarias
    console.log('Datos del formulario:', email, password);
  };

  return (
    <div className='bg-gradient-to-b from-orange-400 to-violet-400'>
      <MenuTailwind />
      <main className='flex justify-center items-center min-h-screen'>
        <div className='bg-fondo6 bg-orange-200 w-44 h-44 absolute left-72 z-0'></div>
        <form
          action=''
          className='bg-emerald-300 z-20 flex flex-col gap-6 md:w-1/2 landscape:md:w-1/2 landscape:m-auto m-auto rounded-md p-8 opacity-75 bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg'
          onSubmit={handleSubmit}
        >
          <h1>Sign up</h1>
          <input
            type='email'
            placeholder='Email'
            className='rounded-md p-3 my-4'
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type='password'
            placeholder='Introduce tu contraseña'
            className='rounded-md p-3 my-4'
            value={password}
            onChange={handlePasswordChange}
          />
          <div>
            <input
              type='checkbox'
              id='termsCheckbox'
              checked={termsAccepted}
              onChange={handleTermsAcceptedChange}
            />
            <label htmlFor='termsCheckbox'>Acepto los términos</label>
          </div>
          <div>
            <p>
              Aún no tienes cuenta?{' '}
              <Link to="/registro" className='text-blue-600'>crear cuenta</Link>{' '}
            </p>
          </div>
          <button
            type='submit'
            className='md:w-40 bg-indigo-700 m-auto rounded-lg p-3 shadow-md focus:ring-4 hover:bg-sky-400 transition-colors'
          >
            Iniciar sesión
          </button>
        </form>
        <div className='bg-fondo5 bg-red-500 w-44 h-44 absolute right-72 z-0'></div>
      </main>
      <Fotter className='mt-0' />
    </div>
  );
};

export default Login;
