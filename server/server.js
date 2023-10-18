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

let socketRoom = {};
io.on('connection', socket => {
    socket.on('join-room', roomID => {
        socket.join(roomID);
        socketRoom[socket.id] = roomID;
    });

    socket.on('client-ready', () => {
        const roomID = socketRoom[socket.id];
        if (roomID) {
            socket.broadcast.to(roomID).emit('get-canvas-state');
        }
    });

    socket.on('canvas-state', (state) => {
        const roomID = socketRoom[socket.id];
        if (roomID) {
            socket.broadcast.to(roomID).emit('canvas-state-from-server', state);
        }
    });

    socket.on('draw-line', ({ prevPoint, currPoint, color, brushThickness }) => {
        const roomID = socketRoom[socket.id];
        if (roomID) {
            io.to(roomID).emit('draw-line', {
                prevPoint, currPoint, color, brushThickness
            });
        }
    });

    socket.on('background', ({ canvasBg }) => {
        const roomID = socketRoom[socket.id];
        if (roomID) {
            socket.broadcast.to(roomID).emit('background', { canvasBg });
        }
    });

    socket.on('clear', () => {
        const roomID = socketRoom[socket.id];
        if (roomID) {
            io.to(roomID).emit('clear');
        }
    });

    socket.on('disconnect', () => {
        delete socketRoom[socket.id];
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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});