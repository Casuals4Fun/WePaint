"use client"

import { FiMoon, FiSun } from 'react-icons/fi';

interface ThemeProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeSelector: React.FC<ThemeProps> = ({ theme, setTheme }) => {
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