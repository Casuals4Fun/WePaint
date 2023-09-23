import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    socket.on('client-ready', () => {
        socket.broadcast.emit('get-canvas-state');
    });

    socket.on('canvas-state', (state) => {
        socket.broadcast.emit('canvas-state-from-server', state);
    });

    socket.on('draw-line', ({ prevPoint, currPoint, color, brushThickness }) => {
        socket.broadcast.emit('draw-line', {
            prevPoint, currPoint, color, brushThickness
        });
    });

    socket.on('background', ({ canvasBg }) => {
        socket.broadcast.emit('background', { canvasBg });
    });

    socket.on('clear', () => io.emit('clear'));
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

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});