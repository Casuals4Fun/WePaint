"use client"

import { useThemeStore } from '@/store';
import { FiMoon, FiSun } from 'react-icons/fi';

const ThemeSelector = () => {
    const { theme, setTheme } = useThemeStore();

    return (
        <div className='absolute top-5 right-5 bg-white w-[90px] h-[35px] rounded-3xl flex border'>
            <button className={`w-1/2 h-full flex items-center justify-center rounded-l-3xl ${theme === "light" && "bg-gray-300"}`} onClick={() => setTheme('light')}>
                <FiSun />
            </button>
            <button className={`w-1/2 h-full flex items-center justify-center rounded-r-3xl ${theme === "dark" && "bg-gray-300"}`} onClick={() => setTheme('dark')}>
                <FiMoon />
            </button>
        </div>
    );
}

export default ThemeSelector;