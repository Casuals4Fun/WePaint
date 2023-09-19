"use client"

import { useDraw } from "@/hooks/useDraw";
import { useThemeStore, useToolbarStore } from "@/store";
import CanvasToolbar from "./CanvasToolbar";

const DrawCanvas = () => {
    const { theme } = useThemeStore();
    const { canvasBg, brushThickness, color } = useToolbarStore();
    const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

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

            <CanvasToolbar
                clear={clear}
                canvasRef={canvasRef}
            />

            <canvas
                width={768}
                height={750}
                className={`border-x border-b border-gray-400 rounded-3xl hidden md:block cursor-crosshair`}
                ref={canvasRef}
                onMouseDown={onMouseDown}
                style={{ background: canvasBg }}
            />
        </div>
    )
}

export default DrawCanvas