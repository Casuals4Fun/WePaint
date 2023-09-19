"use client"

import { useDraw } from "@/hooks/useDraw";
import { useThemeStore, useToolbarStore } from "@/store";
import CanvasToolbar from "./CanvasToolbar";
import SaveImage from "./SaveImage";
import { io } from "socket.io-client";
import { drawLine } from "@/utils/drawLine";
import { useEffect } from "react";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!);

const DrawCanvas = () => {
    const { theme } = useThemeStore();
    const { canvasBg, setCanvasBg, brushThickness, color, downloadSelect } = useToolbarStore();
    const { canvasRef, onMouseDown, clear } = useDraw(createLine);

    function createLine({ prevPoint, currPoint, ctx }: Draw) {
        socket.emit('draw-line', ({ prevPoint, currPoint, color, brushThickness }));
        drawLine({ prevPoint, currPoint, ctx, color, brushThickness });
    };

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');

        socket.on('draw-line', ({ prevPoint, currPoint, color, brushThickness }: DrawLineProps) => {
            if (!ctx) return;

            drawLine({ prevPoint, currPoint, ctx, color, brushThickness });
        });
    }, [canvasRef]);

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

            {downloadSelect && <SaveImage canvasRef={canvasRef} />}
        </div>
    )
}

export default DrawCanvas