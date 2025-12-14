import WebSocket, { WebSocketServer } from 'ws';
import Room from './Room.js';
import { parse } from 'url';
import { parse as parseQuery } from 'querystring';
import User from './User.js';
import Response from './Response.js';
let roomsMap = new Map;
const wss = new WebSocketServer({ port: 3001 });
wss.on('connection', (socket, req) => {
    try {
        const url = req.url;
        const parsedUrl = parse(url || "");
        const query = parseQuery(parsedUrl.query || "");
        if (query.type === "create") {
            const room = new Room(Number(query.roomId));
            const user = new User(23, "devkumar", socket);
            room.setUser(user);
            roomsMap.set(query.roomId, room);
        }
        else if (query.type === "join") {
            const hasRoom = roomsMap.has(query.roomId);
            const response = new Response(false, "Rooms has expired");
            if (!hasRoom)
                socket.send(JSON.stringify(response));
            const getRoom = roomsMap.get(query.roomId);
            getRoom?.setUser(new User(67, "Naman kumar", socket));
            console.log(roomsMap);
        }
        socket.on('close', () => {
            console.log("socket has disconnected", query.roomId);
            roomsMap.delete(query.roomId);
        });
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=index.js.map