"use client"

import { useThemeStore } from '@/store';
import { MdOutlineDraw } from 'react-icons/md';
import { FiMoon, FiSun } from 'react-icons/fi';

const Navbar = () => {
    const { theme, setTheme } = useThemeStore();

    return (
        <div className='absolute top-5 left-5 right-5 flex justify-between'>
            <div className={`text-[50px] font-extralight ${theme === "light" ? "text-black" : "text-white"}`}>
                <MdOutlineDraw />
            </div>
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
    );
}

export default Navbar;