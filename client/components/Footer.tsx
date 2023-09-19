"use client"

import { useThemeStore } from '@/store'
import React from 'react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
    const { theme } = useThemeStore();

    return (
        <div className={`absolute bottom-5 left-5 right-5 ${theme === 'light' ? "text-black" : "text-white"} flex items-center justify-center md:justify-between gap-3 md:gap-0 h-[30px]`}>
            <div className='text-[15px] pr-1'>
                <span>Made with ❤️ by </span>
                <a href='https://shubhamlal.is-a.dev' className='underline' target='_blank'>
                    Shubham Lal
                </a>
            </div>
            <div className='w-[1px] h-full bg-white md:hidden' />
            <div className='flex items-center justify-center gap-2'>
                <div className='hidden md:block text-[15px]'>
                    Follow me on
                </div>
                <a title='GitHub' href='https://github.com/CERTIFIED2003' className='group flex items-center justify-center w-[35px] cursor-pointer' target='_blank'>
                    <AiFillGithub
                        className="text-[30px] group-hover:scale-75 transition-all duration-200 w-[35px] h-[30px]"
                    />
                </a>
                <a title='LinkedIn' href='https://www.linkedin.com/in/shubham-lal' className='group flex items-center justify-center w-[30px] cursor-pointer' target='_blank'>
                    <AiFillLinkedin
                        className="text-[30px] group-hover:scale-75 transition-all duration-200 w-[35px] h-[30px]"
                    />
                </a>
            </div>
        </div>
    )
}

export default Footer