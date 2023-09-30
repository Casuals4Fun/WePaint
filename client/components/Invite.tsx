"use client"

import React, { useEffect, useState } from 'react';
import { useInviteStore } from '@/store';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { GoPeople } from 'react-icons/go';

const Invite = () => {
    const { invite, setInvite, preference, setPreference } = useInviteStore();
    const [showClose, setShowClose] = useState(true);

    useEffect(() => {
        if (location.pathname === "/room") setShowClose(false);
    }, [location.pathname]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-100 opacity-70 fixed inset-0 z-40"></div>
            <div className="bg-white w-[95%] md:w-[500px] min-h-[214px] mx-auto rounded-lg shadow-lg overflow-hidden z-50 relative">
                {preference !== "" && (
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
                <div className="p-5">
                    {preference === "" ? (
                        <PreferenceSelector />
                    ) : preference === "Create" ? (
                        <CreateRoom />
                    ) : preference === "Join" ? (
                        <JoinRoom />
                    ) : null}
                </div>
            </div>
        </div>
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

export default Invite