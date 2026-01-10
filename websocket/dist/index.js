import WebSocket, { WebSocketServer } from 'ws';
import Room from './Room.js';
import url from 'url';
import { parse as parseQuery } from 'querystring';
import User from './User.js';
import Response from './Response.js';
import { json } from 'stream/consumers';
let roomsMap = new Map();
const port = 3001;
const wss = new WebSocketServer({ port: port });
console.log("Websocket is running on " + port);
wss.on('connection', (socket, req) => {
    try {
        const getUrl = req.url;
        const parsedUrl = url.parse(getUrl || "");
        const { type, roomId, email, userId } = parseQuery(parsedUrl.query || "");
        const generatedId = Number(Math.floor(Math.random() * 10000));
        if (type === "create") {
            const room = new Room(generatedId, email, userId);
            const user = new User(userId, email, socket);
            room.setUser(user, userId);
            roomsMap.set(generatedId, room);
            socket.send(JSON.stringify(new Response(true, "success", { roomId: generatedId })));
        }
        else if (type === "join") {
            const hasRoom = roomsMap.has(Number(roomId));
            const response = new Response(false, "Rooms has expired", null);
            if (!hasRoom)
                socket.send(JSON.stringify(response));
            const getRoom = roomsMap.get(Number(roomId));
            getRoom?.setUser(new User(userId, email, socket), userId);
        }
        socket.on('message', (data) => {
            const getRoom = roomsMap.get(Number(roomId));
            const usersMap = getRoom?.users;
            const messageData = JSON.parse(data.toLocaleString());
            messageData.date = Date.now();
            usersMap?.forEach(({ userSocket }) => {
                if (userSocket != socket) {
                    userSocket.send(JSON.stringify(messageData));
                }
            });
        });
        socket.on('close', () => {
            console.log("socket has disconnected", roomId);
            if (type === "create") {
                roomsMap.delete(Number(roomId));
            }
            else if (type === "join") {
                const getRoom = roomsMap.get(Number(roomId));
                getRoom?.destroyUser(userId);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=index.js.map