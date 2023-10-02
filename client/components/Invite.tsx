"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useInviteStore } from '@/store';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { GoPeople } from 'react-icons/go';
import { BsFillClipboardFill } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { BarLoader } from 'react-spinners';

const Invite = () => {
    const { invite, setInvite, preference, setPreference, roomID } = useInviteStore();
    const [showClose, setShowClose] = useState(true);

    useEffect(() => {
        if (location.pathname === "/room") setShowClose(false);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black opacity-70 fixed inset-0 z-40"></div>
            <div className="bg-white w-[95%] md:w-[500px] h-[214px] mx-auto rounded-lg shadow-lg overflow-hidden z-50 relative">
                {(preference !== "Share" && preference !== "") && (
                    <button
                        className='absolute left-0 top-0 w-[30px] h-[30px] bg-gray-100 hover:bg-black text-black hover:text-white duration-200 flex items-center justify-center'
                        onClick={() => {
                            if (roomID) return setPreference("Share");
                            setPreference("");
                        }}
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
        <div className='h-full flex flex-col justify-between'>
            <p className='text-[20px] text-center'>
                Select your preference
            </p>
            <div className='flex items-center justify-center gap-20'>
                <div className='flex flex-col items-center gap-1'>
                    <div
                        className='w-[95px] h-[95px] bg-gray-100 rounded-full hover:border cursor-pointer flex items-center justify-center'
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
                        className='w-[95px] h-[95px] bg-gray-100 rounded-full hover:border cursor-pointer flex items-center justify-center'
                        onClick={() => setPreference("Join")}
                    >
                        <GoPeople size={30} />
                    </div>
                    <div className='cursor-pointer' onClick={() => setPreference("Join")}>
                        Join
                    </div>
                </div>
            </div>
        </div>
    )
};

const CreateRoom = () => {
    const router = useRouter()
    const { setRoomType, setRoomID } = useInviteStore();
    const [roomId, setRoomId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateRoom = () => {
        if (roomId.length < 5) return toast.error("Room ID must be atleast 5 digits!");
        setLoading(true);

        setRoomType("Create");
        setRoomID(roomId);
        router.push(`/room/${roomId}`, { scroll: false });
    };

    return (
        <div className='h-full flex flex-col justify-between'>
            <p className='text-[20px] text-center'>
                Create Room
            </p>
            <div className='flex items-center justify-between'>
                <div className='w-[40%]'>
                    Room ID
                </div>
                <div className='w-[60%]'>
                    <input
                        className='w-full outline-none border rounded-md py-2 px-1 md:px-4 text-center'
                        value={roomId}
                        onChange={e => setRoomId(e.target.value)}
                        placeholder='Example- 12345'
                    />
                </div>
            </div>
            <div className='flex justify-end items-center'>
                <button
                    className={`${loading ? "bg-white" : "bg-black hover:bg-white text-white hover:text-black duration-200"} w-[80px] h-[40px] py-2 px-4 rounded-lg`}
                    onClick={handleCreateRoom}
                >
                    {loading ? (
                        <BarLoader
                            height={4}
                            width={50}
                        />
                    ) : "Create"}
                </button>
            </div>
        </div>
    )
};

const JoinRoom = () => {
    const router = useRouter()
    const { setRoomType, setRoomID } = useInviteStore();
    const [roomId, setRoomId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleJoinRoom = () => {
        if (!roomId.length) return toast.error("Enter Room ID to proceed!");
        setLoading(true);

        setRoomType("Join");
        setRoomID(roomId);
        router.push(`/room/${roomId}`, { scroll: false });
    };

    return (
        <div className='h-full flex flex-col justify-between'>
            <p className='text-[20px] text-center'>
                Join Room
            </p>
            <div className='flex items-center justify-between'>
                <div className='w-[40%]'>
                    Room ID
                </div>
                <div className='w-[60%]'>
                    <input
                        className='w-full outline-none border rounded-md py-2 px-1 md:px-4 text-center'
                        value={roomId}
                        onChange={e => setRoomId(e.target.value)}
                        placeholder='Enter Room ID'
                    />
                </div>
            </div>
            <div className='flex justify-end items-center'>
                <button
                    className={`${loading ? "bg-white" : "bg-black hover:bg-white text-white hover:text-black duration-200"} w-[80px] h-[40px] py-2 px-4 rounded-lg`}
                    onClick={handleJoinRoom}
                >
                    {loading ? (
                        <BarLoader
                            height={4}
                            width={50}
                        />
                    ) : "Join"}
                </button>
            </div>
        </div>
    )
};

const ShareRoom = () => {
    const { setPreference, roomID } = useInviteStore();

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
            {roomID ? (
                <div className='flex justify-between items-center'>
                    <button className='hover:underline text-[14px]' onClick={() => setPreference("Create")}>
                        Create new Room
                    </button>
                    <button className='hover:underline text-[14px]' onClick={() => setPreference("Join")}>
                        Join new Room
                    </button>
                </div>
            ) : (
                <div className='flex justify-end items-center'>
                    <button className='hover:underline'>
                        Join Room
                    </button>
                </div>
            )}
        </div>
    )
};

export default Invite