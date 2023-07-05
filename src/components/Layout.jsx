import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import React, { useState } from 'react';
const Layout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    



    return (
        <div className='flex'>
            {sidebarVisible && <Navbar className="w-1/5" />}
            <div className={`flex-grow ${sidebarVisible ? 'ml-[20%]' : ''}`}>
                < Outlet />
            </div>


            <button onClick={toggleSidebar} className=' fixed rounded-full bg-red-700 text-white bottom-4 right-4 text-2xl p-3'>aaaa</button>
        </div>
    )
}

export default Layout
