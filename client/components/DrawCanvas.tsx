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
                width={768}
                height={750}
                className={`border-x border-b border-gray-400 rounded-3xl cursor-crosshair`}
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