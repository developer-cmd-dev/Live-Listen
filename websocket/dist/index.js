import WebSocket, { WebSocketServer } from 'ws';
import Room from './Room.js';
import url from 'url';
import { parse as parseQuery } from 'querystring';
import User from './User.js';
import Response from './Response.js';
import { json } from 'stream/consumers';
import { config } from 'dotenv';
import JWT from './JWT.js';
import { randomUUID } from 'crypto';
config();
let roomsMap = new Map();
const port = 3002;
const wss = new WebSocketServer({ port: port });
console.log("Websocket is running on " + port);
wss.on('connection', (socket, req) => {
    let userData;
    const handleConnect = (data) => {
        const userPayload = data;
        const verifyToken = JWT.verifyToken(userPayload.accessToken);
        if (!verifyToken)
            socket.send(JSON.stringify(new Response(false, "Invalid Credential", null)));
        userData = new User(userPayload.userId, userPayload.email, userPayload.accessToken, true, socket);
        console.log("Connected with ", userPayload.email);
        socket.send(JSON.stringify(new Response(true, "Websocket connected", null)));
    };
    const handleCreate = (data) => {
        const { roomName, isPrivate, enabledChat, userLimit } = data;
        const roomId = Math.floor(Math.random() * 10000);
        if (!roomsMap.has(roomId)) {
            const room = new Room(roomId, userData.email, userData.userId, roomName, enabledChat, isPrivate, userLimit);
            room.setUser(userData, userData.userId);
            roomsMap.set(roomId, room);
            socket.send(JSON.stringify(new Response(true, "Room created", { roomId: roomId })));
            console.log(`Room created by ${userData.email} with ${roomId}`);
        }
        else {
            socket.send(JSON.stringify(new Response(false, "Room has already created", null)));
        }
    };
    const handleJoin = (data) => {
        const joinPayload = data;
        if (!joinPayload)
            socket.send(JSON.stringify(new Response(false, "invalid room id", null)));
        const getRoom = roomsMap.get(joinPayload.roomId);
        if (!getRoom)
            socket.send(JSON.stringify(new Response(false, "Room has expired", null)));
        getRoom?.setUser(userData, userData.userId);
        socket.send(JSON.stringify(new Response(true, "Joined Room", null)));
    };
    const handleMessage = (data) => {
        const payload = data;
        const getRoom = roomsMap.get(payload.roomId);
        const getSocketMap = getRoom?.getUsers();
        getSocketMap?.forEach((value, key) => {
            if (value.userSocket != socket) {
                socket.send(JSON.stringify(payload.message));
            }
        });
    };
    const handlers = {
        connect: handleConnect,
        create: handleCreate,
        join: handleJoin,
        message: handleMessage
    };
    socket.on('message', (data) => {
        try {
            const payload = JSON.parse(data.toString());
            handlers[payload.type]?.(payload.data);
        }
        catch (error) {
            console.log(error);
        }
    });
});
//# sourceMappingURL=index.js.map