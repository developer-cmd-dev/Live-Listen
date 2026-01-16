import WebSocket, { WebSocketServer } from 'ws'
import Room from './Room.js';
import type { IncomingMessage } from 'http'
import url from 'url'
import { parse as parseQuery } from 'querystring'
import User from './User.js';
import Response from './Response.js';
import { json } from 'stream/consumers';
import { config } from 'dotenv';
import JWT from './JWT.js';
import { randomUUID } from 'crypto';
import type{ CloseConnectionType, RoomCreatePayload } from './types/types.js';
config();
let roomsMap = new Map<number, Room>();



type Type = "connect" | "create" | "join" | "message"

export interface ConnectWebSocketQuery {
    type: Type;
    data: object;
}

interface UserPayload {
    email: string;
    userId: number;
    accessToken: string;
    roomId:number;
}



interface Message {
    roomId: number;
    message: string;
}



const port = 3002;


const wss = new WebSocketServer({ port: port });
console.log("Websocket is running on " + port)
wss.on('connection', (socket: WebSocket, req: IncomingMessage) => {



    let userData: User;


    const handleConnect = (data: any) => {
        const userPayload = data as UserPayload;
        const verifyToken = JWT.verifyToken(userPayload.accessToken);
        if (!verifyToken) socket.send(JSON.stringify(new Response(false, "Invalid Credential", null)))
        userData = new User(userPayload.userId, userPayload.email, userPayload.accessToken, true);
        userData.setUserSocket(socket);
        const getRoom = roomsMap.get(userPayload.roomId);
        if(!getRoom){
            socket.send(JSON.stringify(new Response(true, "Websocket connected",null)));
        }else{
            socket.send(JSON.stringify(new Response(true, "Websocket connected",{...getRoom?.toJson()})))
        }
        console.log("Connected with ", userPayload.email)

    }

    const handleCreate = (data: any) => {
        const { roomName,  userLimit,usename } = data as RoomCreatePayload;
        const roomId = Math.floor(Math.random() * 10000);
        if (!roomsMap.has(roomId)) {
            const room = new Room(roomId, userData.email, usename,userData.userId, roomName,userLimit);
            room.setUser(userData, userData.userId);
            roomsMap.set(roomId, room);
            socket.send(JSON.stringify(new Response(true, "Room created", {...room.toJson(),roomType:'create'})))
            console.log(`Room created by ${userData.email} with ${roomId}`)

        } else {
            socket.send(JSON.stringify(new Response(false, "Room has already created", null)));
        }
    }

    const handleJoin = (data: any) => {
        const joinPayload = data as { roomId: number };
        if (!joinPayload) socket.send(JSON.stringify(new Response(false, "invalid room id", null)));
        const getRoom = roomsMap.get(joinPayload.roomId);
        if (!getRoom) socket.send(JSON.stringify(new Response(false, "Room has expired", null)));
        getRoom?.setUser(userData, userData.userId);
        socket.send(JSON.stringify(new Response(true, "Joined Room", {...getRoom?.toJson(),roomType:'join'})));
        console.log(userData.email+ " has joined in the room - "+joinPayload.roomId)
    }

    const handleMessage = (data: any) => {
        const payload = data as Message;

        const getRoom = roomsMap.get(payload.roomId);

        const getSocketMap = getRoom?.getUsers();
        getSocketMap?.forEach((value: User, key: number) => {
            if (value.getSocket() != socket) {
                socket.send(JSON.stringify(payload.message));
            }
        })


    }


    const handleClose = (data:any)=>{
        const {roomId,userId,roomType} = data as CloseConnectionType;
        if(roomType=="create"){
            roomsMap.delete(roomId);
        }else if(roomType=="join"){
          const getRoom=  roomsMap.get(roomId);
            getRoom?.destroyUser(userId);
            socket.send(JSON.stringify(new Response(true,"success",{...getRoom?.toJson()})));
        }
        
    }


    const handlers = {
        connect: handleConnect,
        create: handleCreate,
        join: handleJoin,
        message: handleMessage,
        close:handleClose
    }



    socket.on('message', (data) => {
        try {
            const payload = JSON.parse(data.toString()) as ConnectWebSocketQuery;
            handlers[payload.type]?.(payload.data);
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('close',(data)=>{
        console.log('socket disconnected')
    })

})


