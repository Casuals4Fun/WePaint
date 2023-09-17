"use client"

import { useDraw } from "@/hooks/useDraw";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { AiOutlineClear, AiOutlineClose } from "react-icons/ai";
import { PiPaintBrushFill } from "react-icons/pi";

interface ThemeProps {
    theme: string;
};

const DrawCanvas: React.FC<ThemeProps> = ({ theme }) => {
    const [colorPicker, setColorPicker] = useState<boolean>(false);
    const [color, setColor] = useState<string>('#000');

    const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

    function drawLine({ prevPoint, currPoint, ctx }: Draw) {
        const { x: currX, y: currY } = currPoint;

        const lineColor = color;
        const lineWidth = 5;

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
                width={750}
                height={750}
                className={`border border-gray-300 rounded-md bg-white hidden md:block`}
                ref={canvasRef}
                onMouseDown={onMouseDown}
            />
            <div className='absolute top-2 left-2 xl:right-2 xl:left-auto hidden md:flex gap-2'>
                <div className='relative'>
                    <button
                        title='Color Picker'
                        onClick={() => setColorPicker(prev => !prev)}
                        className='bg-gray-200 rounded-full p-2'
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
                <button
                    title='Erase All'
                    onClick={clear}
                    className='bg-gray-200 rounded-full p-2'
                >
                    <AiOutlineClear size={22} />
                </button>
            </div>
        </div>
    )
}

export default DrawCanvas