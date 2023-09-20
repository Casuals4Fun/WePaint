"use client"

import { useDraw } from "@/hooks/useDraw";
import { useSocketStore, useThemeStore, useToolbarStore } from "@/store";
import CanvasToolbar from "./CanvasToolbar";
import SaveImage from "./SaveImage";
import { drawLine } from "@/utils/drawLine";
import { useEffect } from "react";
import { connectSocket } from "@/utils/connectSocket";

const DrawCanvas = () => {
    const { theme } = useThemeStore();
    const { canvasBg, brushThickness, color, downloadSelect } = useToolbarStore();
    const { setConnected } = useSocketStore();
    const socket = connectSocket(setConnected);

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
            <CanvasToolbar
                clear={clear}
                canvasRef={canvasRef}
            />

            <canvas
                className={`border-x border-b border-gray-400 md:rounded-3xl cursor-crosshair w-screen h-[calc(100vh-110px)] md:w-[768px] md:h-[750px]`}
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
                style={{ background: canvasBg }}
            />

            {downloadSelect && <SaveImage canvasRef={canvasRef} />}
        </div>
    )
}

export default DrawCanvas