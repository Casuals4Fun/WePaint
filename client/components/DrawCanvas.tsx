"use client"

import React, { useEffect } from 'react';
import { useDraw } from '@/hooks/useDraw';
import { useSocketStore, useToolbarStore } from '@/store';
import CanvasToolbar from './CanvasToolbar';
import SaveImage from './SaveImage';
import { drawLine } from '@/utils/drawLine';
import { connectSocket } from '@/utils/connectSocket';

const DrawCanvas = () => {
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

        socket.emit('client-ready');

        socket.on('get-canvas-state', () => {
            if (!canvasRef.current?.toDataURL()) return;

            socket.emit('canvas-state', canvasRef.current.toDataURL());
        });

        socket.on('canvas-state-from-server', (state: string) => {
            const image = new Image();
            image.src = state;
            image.onload = () => {
                ctx?.drawImage(image, 0, 0);
            };
        });

        socket.on('draw-line', ({ prevPoint, currPoint, color, brushThickness }: DrawLineProps) => {
            if (!ctx) return;

            drawLine({ prevPoint, currPoint, ctx, color, brushThickness });
        });

        socket.on('clear', clear);

        return () => {
            socket.off('get-canvas-state');
            socket.off('canvas-state-from-server');
            socket.off('draw-line');
            socket.off('clear');
        }
    }, [canvasRef]);

    return (
        <div className='relative'>
            <CanvasToolbar
                clear={() => socket.emit('clear')}
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