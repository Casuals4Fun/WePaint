"use client"

import React, { useEffect } from 'react';
import { useDraw } from '@/hooks/useDraw';
import { useInviteStore, useSocketStore, useToolbarStore } from '@/store';
import SaveImage from './SaveImage';
import { drawLine } from '@/utils/drawLine';
import { connectSocket } from '@/utils/connectSocket';
import RoomToolbar from './RoomToolbar';

interface HeightProp {
    canvasHeight: Number
}

const RoomCanvas = ({ canvasHeight }: HeightProp) => {
    const { roomID } = useInviteStore();
    const { canvasBg, brushThickness, color, downloadSelect, zoomCanvas } = useToolbarStore();
    const { setConnected } = useSocketStore();
    const socket = connectSocket(setConnected);

    const { canvasRef, onMouseDown, clear } = useDraw(createLine);
    function createLine({ prevPoint, currPoint, ctx }: Draw) {
        socket.emit('draw-line', ({ prevPoint, currPoint, color, brushThickness }));
        drawLine({ prevPoint, currPoint, ctx, color, brushThickness });
    };

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');

        socket.emit('join-room', roomID);

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
    }, [canvasRef, socket, roomID, clear]);

    return (
        <div className='relative'>
            <RoomToolbar
                clear={() => socket.emit('clear')}
            />

            <canvas
                className={`border-x border-b border-gray-400 cursor-crosshair w-screen ${zoomCanvas ? "md:h-[calc(100vh-62px-42px)] md:rounded-none" : "md:w-[768px] md:h-[750px] md:rounded-3xl"} transition-all duration-200`}
                height={`${canvasHeight}px`}
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
                style={{ background: canvasBg }}
            />

            {downloadSelect && <SaveImage canvasRef={canvasRef} />}
        </div>
    )
}

export default RoomCanvas