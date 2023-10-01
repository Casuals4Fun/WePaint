"use client"

import React, { useEffect, useState } from 'react';
import { useInviteStore } from '@/store';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { GoPeople } from 'react-icons/go';
import { BsFillClipboardFill } from 'react-icons/bs';
import { useParams } from 'next/navigation';

const Invite = () => {
    const { invite, setInvite, preference, setPreference } = useInviteStore();
    const [showClose, setShowClose] = useState(true);

    useEffect(() => {
        if (location.pathname === "/room") setShowClose(false);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-100 opacity-70 fixed inset-0 z-40"></div>
            <div className="bg-white w-[95%] md:w-[500px] h-[214px] mx-auto rounded-lg shadow-lg overflow-hidden z-50 relative">
                {(preference !== "Share" && preference !== "") && (
                    <button
                        className='absolute left-0 top-0 w-[30px] h-[30px] bg-gray-100 hover:bg-black text-black hover:text-white duration-200 flex items-center justify-center'
                        onClick={() => setPreference("")}
                    >
                        <IoIosArrowBack />
                    </button>
                )}
                {showClose && (
                    <button
                        className='absolute right-0 top-0 w-[30px] h-[30px] bg-gray-100 hover:bg-black text-black hover:text-white duration-200 flex items-center justify-center'
                        onClick={() => setInvite(!invite)}
                    >
                        <AiOutlineClose />
                    </button>
                )}
                <div className="p-5 h-full">
                    {preference === "" ? (
                        <PreferenceSelector />
                    ) : preference === "Create" ? (
                        <CreateRoom />
                    ) : preference === "Join" ? (
                        <JoinRoom />
                    ) : preference === "Share" ? (
                        <ShareRoom />
                    ) : null}
                </div>
            </div>
        </div>
    )
};

const PreferenceSelector = () => {
    const { setPreference } = useInviteStore();

    return (
        <>
            <p className='text-[20px] text-center mb-4'>
                Select your preference
            </p>
            <div className='flex items-center justify-center gap-20'>
                <div className='flex flex-col items-center gap-1'>
                    <div
                        className='w-[100px] h-[100px] bg-gray-100 rounded-full hover:border cursor-pointer flex items-center justify-center'
                        onClick={() => setPreference("Create")}
                    >
                        <GrAdd size={30} />
                    </div>
                    <div className='cursor-pointer' onClick={() => setPreference("Create")}>
                        Create
                    </div>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <div
                        className='w-[100px] h-[100px] bg-gray-100 rounded-full hover:border cursor-pointer flex items-center justify-center'
                        onClick={() => setPreference("Join")}
                    >
                        <GoPeople size={30} />
                    </div>
                    <div className='cursor-pointer' onClick={() => setPreference("Join")}>
                        Join
                    </div>
                </div>
            </div>
        </>
    )
};

const CreateRoom = () => {
    return (
        <>
            <p className='text-[20px] text-center mb-4'>
                Create Room
            </p>
        </>
    )
};

const JoinRoom = () => {
    return (
        <>
            <p className='text-[20px] text-center mb-4'>
                Join Room
            </p>
        </>
    )
};

const ShareRoom = () => {
    const params = useParams();
    const roomID = params.roomID;

    return (
        <div className='h-full flex flex-col justify-between'>
            <p className='text-[20px] text-center'>
                Share Invite
            </p>
            <div className='w-full flex border border-gray-300 rounded-md pl-2 overflow-hidden'>
                <div className='w-[90%] text-ellipsis overflow-hidden border-r border-gray-300 py-2'>
                    {`${process.env.NEXT_PUBLIC_FRONTEND_URL}/room/${roomID}`}
                </div>
                <div
                    title='Copy URL'
                    className='w-[10%] h-full flex items-center justify-center bg-black py-2 text-white duration-200 cursor-pointer group'
                >
                    <BsFillClipboardFill />
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <button className='hover:underline'>
                    Create Room
                </button>
                <button className='hover:underline'>
                    Join Room
                </button>
            </div>
        </div>
    )
}

export default Invite