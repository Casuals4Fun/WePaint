"use client"

import useWindowHeight from '@/utils/useWindowHeight';
import { useThemeStore, useInviteStore } from '@/store';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Room = () => {
    const { theme } = useThemeStore();
    const { height, isReady } = useWindowHeight();
    const { setInvite } = useInviteStore();

    useEffect(() => {
        setInvite(true);
    }, [setInvite]);

    return (
        <div className={`overflow-y-hidden relative w-screen flex flex-col items-center justify-between ${theme === "light" ? "bg-white" : "bg-black"}`}
            style={{
                height: `${height}px`,
                opacity: isReady ? 1 : 0,
                transition: 'opacity 0.5s linear'
            }}
        >
            <Navbar />
            <Footer />
        </div>
    )
}

export default Room