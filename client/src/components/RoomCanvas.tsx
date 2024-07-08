import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDraw } from '../hooks/useDraw'
import { useSocketStore, useToolbarStore } from '../store'
import SaveImage from './SaveImage'
import { drawLine } from '../utils/drawLine'
import { connectSocket } from '../utils/connectSocket'
import RoomToolbar from './RoomToolbar'

interface SizeProp {
    width: number,
    height: number
}

const RoomCanvas = ({ width, height }: SizeProp) => {
    const { roomID } = useParams();

    const { canvasBg, brushThickness, color, downloadSelect } = useToolbarStore();
    const { setConnected } = useSocketStore();

    const socketRef = useRef(connectSocket());
    const joinedRoomRef = useRef(false);

    const { canvasRef, onMouseDown, clear } = useDraw(createLine);
    function createLine({ prevPoint, currPoint, ctx }: Draw) {
        socketRef.current.emit('draw-line', ({ prevPoint, currPoint, color, brushThickness }));
        drawLine({ prevPoint, currPoint, ctx, color, brushThickness });
    };

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');

        socketRef.current.on('connect', () => setConnected(true));
        socketRef.current.on('disconnect', () => setConnected(false));

        if (!joinedRoomRef.current) {
            socketRef.current.emit('join-room', roomID);
            joinedRoomRef.current = true;
        }

        socketRef.current.emit('client-ready');

        socketRef.current.on('get-canvas-state', () => {
            if (!canvasRef.current?.toDataURL()) return;

            socketRef.current.emit('canvas-state', canvasRef.current.toDataURL());
        });

        socketRef.current.on('canvas-state-from-server', (state: string) => {
            const image = new Image();
            image.src = state;
            image.onload = () => {
                ctx?.drawImage(image, 0, 0);
            };
        });

        socketRef.current.on('draw-line', ({ prevPoint, currPoint, color, brushThickness }: DrawLineProps) => {
            if (!ctx) return;
            drawLine({ prevPoint, currPoint, ctx, color, brushThickness });
        });

        socketRef.current.on('clear', clear);

        return () => {
            socketRef.current.off('join-room');
            socketRef.current.off('client-ready')
            socketRef.current.off('get-canvas-state');
            socketRef.current.off('canvas-state');
            socketRef.current.off('canvas-state-from-server');
            socketRef.current.off('draw-line');
            socketRef.current.off('clear');
        }
    }, []);

    return (
        <div className='relative'>
            <RoomToolbar
                socketRef={socketRef}
                clear={() => {
                    clear();
                    socketRef.current.emit('clear');
                }}
            />

            <canvas
                className='cursor-crosshair'
                width={`${width}px`}
                height={`${height}px`}
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