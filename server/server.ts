import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    socket.on('draw-line', ({ prevPoint, currPoint, color, brushThickness }: DrawLine) => {
        socket.broadcast.emit('draw-line', {
            prevPoint, currPoint, color, brushThickness
        });
    });
});

app.get('/', async (req, res, next) => {
    try {
        res.send({
            status: 201,
            message: "Drawing API running!"
        });
    } catch (error) {
        res.send({ message: error });
    }
});

server.listen(5000, () => {
    console.log("Server listening on PORT 5000");
});

type Point = { x: number, y: number };
type DrawLine = {
    prevPoint: Point | null,
    currPoint: Point,
    color: string,
    brushThickness: number
};