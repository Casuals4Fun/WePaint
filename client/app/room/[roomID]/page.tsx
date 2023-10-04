'use client';

import { useParams } from 'next/navigation';
import { useInviteStore, useThemeStore } from '@/store';
import useWindowHeight from '@/utils/useWindowHeight';
import Navbar from '@/components/Navbar';
import RoomCanvas from '@/components/RoomCanvas';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const InviteRoom = () => {
    const params = useParams();
    const roomID = params.roomID;

    const { theme } = useThemeStore();
    const { roomType, setRoomID, setPreference, setInvite } = useInviteStore();
    const { height, canvasHeight, isReady } = useWindowHeight();

    useEffect(() => {
        if (roomID) {
            setRoomID(roomID);
            setPreference("Share");
        }
    }, [roomID]);

    useEffect(() => {
        if (roomType === "Create") {
            toast.success("Room created!");
            setInvite(true);
        }
        else if (roomType === "Join") {
            toast.success("Room joined!");
            setInvite(false);
        }
    }, [roomType]);

    return (
        <>
            <Toaster
                position='top-center'
                duration={5000}
                richColors
            />
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
        </>
    )
};

export default InviteRoom