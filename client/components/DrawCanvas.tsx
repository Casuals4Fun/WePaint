"use client"

import { useDraw } from "@/hooks/useDraw";
import { useThemeStore } from "@/store";
import { downloadDrawing } from "@/utils/downloadDrawing";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { AiOutlineClose, AiOutlineCloudDownload } from "react-icons/ai";
import { PiEraserFill, PiPaintBrushFill, PiPencil } from "react-icons/pi";

const DrawCanvas = () => {
    const { theme } = useThemeStore();
    const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

    const [brushEdit, setBrushEdit] = useState<boolean>(false);
    const [brushThickness, setBrushThickness] = useState<number>(5);
    const [colorPicker, setColorPicker] = useState<boolean>(false);
    const [color, setColor] = useState<string>('#000');

    function drawLine({ prevPoint, currPoint, ctx }: Draw) {
        const { x: currX, y: currY } = currPoint;

        const lineWidth = brushThickness;
        const lineColor = color;

        let startPoint = prevPoint ?? currPoint;
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(currX, currY);
        ctx.stroke();
        ctx.fillStyle = lineColor;
        ctx.beginPath();
        ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    };

    return (
        <div className='relative'>
            <div className={`md:hidden ${theme === "light" ? "text-black" : "text-white"}`}>
                <p className='text-center'>Open on your Desktop</p>
                <p className='text-center'>for best experience!</p>
            </div>
            <canvas
                width={768}
                height={750}
                className={`border-x border-b border-gray-400 rounded-3xl bg-white hidden md:block cursor-crosshair`}
                ref={canvasRef}
                onMouseDown={onMouseDown}
            />
            <div className={`absolute top-0 left-0 right-0 hidden md:flex justify-between p-2 bg-gray-300 border-t border-x border-gray-400 rounded-t-3xl`}>
                <div className="flex gap-2">
                    <div className='relative'>
                        <button
                            title='Color Picker'
                            onClick={() => setColorPicker(prev => !prev)}
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
                            title='Brush Thickness'
                            onClick={() => setBrushEdit(prev => !prev)}
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
                        onClick={() => downloadDrawing(canvasRef)}
                        className='bg-white hover:text-gray-700 duration-200 rounded-full p-2'
                    >
                        <AiOutlineCloudDownload size={22} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DrawCanvas