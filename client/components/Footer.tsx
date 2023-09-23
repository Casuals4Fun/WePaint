"use client"

import React from 'react';
import { useSocketStore, useThemeStore } from '@/store';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
    const { theme } = useThemeStore();
    const { connected } = useSocketStore();

    return (
        <footer className={`w-full pt-1 pb-2 md:pt-0 md:pb-5 md:px-5 flex items-center md:items-end justify-center md:justify-between gap-3 md:gap-0 ${theme === 'light' ? "text-black" : "text-white"}`}>
            <div className='flex justify-end md:justify-start gap-1 pr-1 text-[15px] md:w-1/3'>
                <span>Made with ❤️ by </span>
                <a href='https://shubhamlal.is-a.dev' className='underline' target='_blank'>
                    Shubham Lal
                </a>
            </div>
            <div className='w-[1px] h-[30px] bg-white md:hidden' />
            <div className='hidden md:flex items-center justify-center gap-2 w-1/3'>
                <span className="flex items-center justify-center">
                    {connected ? (
                        <div className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75' />
                    ) : null}
                    <div className={`relative inline-flex rounded-full h-2 w-2 ${connected ? "bg-green-500" : "bg-gray-500"}`} />
                </span>
                <span>
                    {connected ? 'Server Online' : 'Server Offline'}
                </span>
            </div>
            <div className='flex items-center justify-start md:justify-end gap-2 md:w-1/3'>
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
        </footer>
    )
}

export default Footer