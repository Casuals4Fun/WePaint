"use client"

import React from 'react';
import { useInviteStore, useThemeStore } from '@/store';
import { MdOutlineDraw } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import { FiMoon, FiSun } from 'react-icons/fi';
import Invite from './Invite';

const Navbar = () => {
    const { theme, setTheme } = useThemeStore();
    const { invite, setInvite } = useInviteStore();

    return (
        <>
            <nav className='w-full px-2 flex items-center justify-between'>
                <div className={`text-[50px] font-extralight ${theme === "light" ? "text-black" : "text-white"}`}>
                    <MdOutlineDraw />
                </div>
                <div className='flex items-center gap-2 md:gap-5'>
                    <button
                        className='text-black bg-white hover:bg-gray-300 duration-200 w-[90px] h-[35px] rounded-3xl flex gap-1 items-center justify-center border border-gray-300'
                        onClick={() => setInvite(true)}
                    >
                        <FaPeopleGroup size={20} />
                        <p>Invite</p>
                    </button>
                    <div className='bg-white w-[90px] h-[35px] rounded-3xl flex border border-gray-300'>
                        <button
                            title='Light Theme'
                            className={`w-1/2 h-full flex items-center justify-center rounded-l-3xl ${theme === "light" && "bg-gray-300"}`}
                            onClick={() => setTheme('light')}
                        >
                            <FiSun />
                        </button>
                        <button
                            title='Dark Theme'
                            className={`w-1/2 h-full flex items-center justify-center rounded-r-3xl ${theme === "dark" && "bg-gray-300"}`}
                            onClick={() => setTheme('dark')}
                        >
                            <FiMoon />
                        </button>
                    </div>
                </div>
            </nav>

            {invite && <Invite />}
        </>
    );
}

export default Navbar;