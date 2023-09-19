"use client"

import React, { RefObject } from 'react'
import { useToolbarStore } from '@/store'
import { downloadDrawing } from '@/utils/downloadDrawing'
import { ChromePicker } from 'react-color'
import { AiFillFormatPainter, AiOutlineClose, AiOutlineCloudDownload } from 'react-icons/ai'
import { PiEraserFill, PiPaintBrushFill, PiPencil } from 'react-icons/pi'

interface ToolbarProps {
    clear: () => void,
    canvasRef: RefObject<HTMLCanvasElement>
};

const CanvasToolbar = ({ clear, canvasRef }: ToolbarProps) => {
    const {
        bgSelect, setBgSelect,
        canvasBg, setCanvasBg,
        colorPicker, setColorPicker,
        color, setColor,
        brushEdit, setBrushEdit,
        brushThickness, setBrushThickness
    } = useToolbarStore();

    return (
        <div className={`absolute top-0 left-0 right-0 hidden md:flex justify-between p-2 bg-gray-300 border-t border-x border-gray-400 rounded-t-3xl`}>
            <div className="flex gap-2">
                <div className='relative'>
                    <button
                        title='Color Picker'
                        onClick={() => setColorPicker(!colorPicker)}
                        className='bg-white hover:text-gray-700 duration-200 rounded-full p-2'
                    >
                        {colorPicker ? <AiOutlineClose size={22} /> : <PiPaintBrushFill color={color} size={22} />}
                    </button>
                    {colorPicker && (
                        <ChromePicker
                            color={color}
                            onChange={e => setColor(e.hex)}
                            className='absolute top-10 left-0'
                        />
                    )}
                </div>
                <div className='relative'>
                    <button
                        title='Background'
                        onClick={() => setBgSelect(!bgSelect)}
                        className={`bg-white hover:text-gray-700 duration-200 rounded-full p-2`}
                    >
                        {bgSelect ? <AiOutlineClose size={22} /> : <AiFillFormatPainter size={22} />}
                    </button>
                    {bgSelect && (
                        <ChromePicker
                            color={canvasBg}
                            onChange={e => setCanvasBg(e.hex)}
                            className='absolute top-10 left-0'
                        />
                    )}
                </div>
                <div className='relative'>
                    <button
                        title='Brush Thickness'
                        onClick={() => setBrushEdit(!brushEdit)}
                        className='bg-white hover:text-gray-700 duration-200 rounded-full p-2'
                    >
                        {brushEdit ? <AiOutlineClose size={22} /> : <PiPencil size={22} />}
                    </button>
                    {brushEdit && (
                        <div className="w-[179px] absolute top-10 left-0 bg-white pt-2 px-2 border flex flex-col gap-5">
                            <div className="flex gap-2">
                                <div className="flex items-center justify-center gap-1">
                                    <input
                                        type='range'
                                        min={1}
                                        max={10}
                                        value={brushThickness}
                                        onChange={e => setBrushThickness(e.target.valueAsNumber)}
                                        className="w-full"
                                    />
                                </div>
                                <div className={`w-[20px] h-[20px] flex items-center justify-center`}>
                                    {brushThickness}
                                </div>
                            </div>
                            <div className="text-gray-400 text-[10px]">
                                *BETA
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    title='Erase All'
                    onClick={clear}
                    className='bg-white hover:text-gray-700 duration-200 rounded-full p-2'
                >
                    <PiEraserFill size={22} />
                </button>
                <button
                    title='Download'
                    onClick={() => downloadDrawing(canvasRef, canvasBg)}
                    className='bg-white hover:text-gray-700 duration-200 rounded-full p-2'
                >
                    <AiOutlineCloudDownload size={22} />
                </button>
            </div>
        </div>
    )
}

export default CanvasToolbar