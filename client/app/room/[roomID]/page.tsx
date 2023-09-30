'use client';

import { useParams } from 'next/navigation';
import { useThemeStore } from '@/store';
import useWindowHeight from '@/utils/useWindowHeight';
import Navbar from '@/components/Navbar';
import RoomCanvas from '@/components/RoomCanvas';
import Footer from '@/components/Footer';

const InviteRoom = () => {
    const params = useParams();
    const roomID = params.roomID;

    const { theme } = useThemeStore();
    const { height, canvasHeight, isReady } = useWindowHeight();

    return (
        <div className={`overflow-y-hidden relative w-screen flex flex-col items-center justify-between ${theme === "light" ? "bg-white" : "bg-black"}`}
            style={{
                height: `${height}px`,
                opacity: isReady ? 1 : 0,
                transition: 'opacity 0.5s linear'
            }}
        >
            <Navbar />
            <RoomCanvas canvasHeight={canvasHeight} />
            <Footer />
        </div>
    )
};

export default InviteRoom