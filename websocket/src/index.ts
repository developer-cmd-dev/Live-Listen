import WebSocket, { WebSocketServer } from 'ws'
import Room from './Room.js';
import type { IncomingMessage } from 'http'
import url from 'url'
import { parse as parseQuery } from 'querystring'
import User from './User.js';
import Response from './Response.js';

let roomsMap = new Map<string, Room>;

type Query = {
    roomId: string;
    type: "create" | "join";
    name: string;
    userId: number;
};




const wss = new WebSocketServer({ port: 3001 });
wss.on('connection', (socket: WebSocket, req: IncomingMessage) => {
    try {
        const getUrl = req.url;
        const parsedUrl = url.parse(getUrl || "");
        const { roomId, type, name, userId }: Query = parseQuery(parsedUrl.query || "") as unknown as Query;
        if (type === "create") {
            const room = new Room(Number(roomId), name, userId);
            room.setUser(new User(userId, name, socket), userId);
            roomsMap.set(roomId, room);

        } else if (type === "join") {
            const hasRoom = roomsMap.has(roomId);
            const response = new Response(false, "Rooms has expired")
            if (!hasRoom) socket.send(JSON.stringify(response))

            const getRoom = roomsMap.get(roomId);
            getRoom?.setUser(new User(userId, name, socket), userId)

        }



        
        socket.on('message',(data)=>{
            const getRoom = roomsMap.get(roomId);
            const usersMap:Map<number,User> |undefined= getRoom?.users;

            usersMap?.forEach(({userSocket})=>{
                if(userSocket!=socket){
                    userSocket.send(data.toLocaleString())

                }
            })

        })



        socket.on('close', () => {
            console.log("socket has disconnected", roomId)
            if (type === "create") {
                roomsMap.delete(roomId);

            } else if (type === "join") {
                const getRoom = roomsMap.get(roomId);
                getRoom?.destroyUser(userId);
            }
        })


    } catch (error) {
        console.log(error)
    }

})