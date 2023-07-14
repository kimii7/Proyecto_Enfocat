import React, { useEffect, useState } from 'react';
import { HiMenuAlt2, HiX } from 'react-icons/hi';

const Inicio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className='bg-gray-200'>
        <nav className='flex justify-between items-center w-[92%] mx-auto'>
          <div>
            <img className='w-16' src="https://i.ibb.co/5Y35sJ1/logoç2.png" alt="logo" />
          </div>
          <div className={`md:flex md:items-center md:gap-[4vw] ${isDesktop || isMenuOpen ? '' : 'hidden'}`}>
            <ul className='flex flex-col md:flex-row gap-6'>
              <li>
                <a className='hover:text-gray-500' href="/">Inicio</a>
              </li>
              <li>
                <a className='hover:text-gray-500' href="/contacto">Contacto</a>
              </li>
              <li>
                <a className='hover:text-gray-500' href="/blog">Blog</a>
              </li>
              <li>
                <a className='hover:text-gray-500' href="/blog">Blog</a>
              </li>
              <li>
                <a className='hover:text-gray-500' href="/blog">Blog</a>
              </li>
            </ul>
          </div>
          <div className='flex items-center gap-6'>
            <button className='bg-green-200 text-black px-5 py-2 h-10 rounded-full hover:bg-orange-600'>Iniciar sesión</button>
            {isMenuOpen ? (
              <HiX className='text-3xl cursor-pointer md:hidden' onClick={toggleMenu} />
            ) : (
              <HiMenuAlt2 className='text-3xl cursor-pointer md:hidden' onClick={toggleMenu} />
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Inicio;

