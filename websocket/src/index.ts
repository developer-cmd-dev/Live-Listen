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
let usersMap = new Map<number,User>();


type WebSocketMessageType = "connect" | "create" | "join" | "message";

export interface WebSocketConnectQuery {
    type: WebSocketMessageType;
    data: object;
}

interface WebSocketUserPayload {
    email: string;
    userId: number;
    accessToken: string;
    roomId: number;
}

interface WebSocketMessagePayload {
    roomId: number;
    message: string;
}



const port = 3002;


const wss = new WebSocketServer({ port: port });
console.log("Websocket is running on " + port)
wss.on('connection', (socket: WebSocket, req: IncomingMessage) => {






    const handleConnect = (data: any) => {
        const userPayload = data as WebSocketUserPayload;
        const verifyToken = JWT.verifyToken(userPayload.accessToken);
        if (!verifyToken) socket.send(JSON.stringify(new Response(false, "Invalid Credential", null)))
       let userData:User = new User(userPayload.userId, userPayload.email, userPayload.accessToken, true);
        userData.setUserSocket(socket);
        usersMap.set(userData.userId,userData);
        const getRoom = roomsMap.get(userPayload.roomId);
        if(!getRoom){
            socket.send(JSON.stringify(new Response(true, "Websocket connected",{type:'connect',data:null})));
        }else{
            socket.send(JSON.stringify(new Response(true, "Websocket connected",{type:'connect',data:{...getRoom?.toJson()}})))
        }
        console.log("Connected with ", userPayload.email)

    }

    const handleCreate = (data: any) => {

        const { roomName,  userLimit,username,userId } = data as RoomCreatePayload;
        const userData = usersMap.get(userId);
        if(!userData) {
            socket.send(JSON.stringify(new Response(false, "Something went wrong", null)));
            return;
        };
        const roomId = Math.floor(Math.random() * 10000);
        if (!roomsMap.has(roomId)) {
            const room = new Room(roomId, userData.email, username,userData.userId, roomName,userLimit);
            room.setUser(userData, userData.userId);
            roomsMap.set(roomId, room);
            socket.send(JSON.stringify(new Response(true, "Room created", {type:'create',data:{...room.toJson(),roomType:'create'}})))
            console.log(`Room created by ${userData.email} with ${roomId}`)

        } else {
            socket.send(JSON.stringify(new Response(false, "Room has already created", null)));
        }
    }

    const handleJoin = (data: any) => {
        const joinPayload = data as { roomCode: number,userId:number };
        if (!joinPayload){
            socket.send(JSON.stringify(new Response(false, "invalid room id", null)));
            return;
        }
        const userData = usersMap.get(joinPayload.userId);
        if (!userData){
            socket.send(JSON.stringify(new Response(false, "Something went wrong", null)));
            return;
        }
        const getRoom = roomsMap.get(joinPayload.roomCode);
        if (!getRoom) {
            socket.send(JSON.stringify(new Response(false, "Room has expired", null)));
            return;
        }
        getRoom?.setUser(userData, userData.userId);
        const responsePayload = {
            ...getRoom?.toJson(),
            roomType: 'join'
        };
        const response = new Response(true, "Joined Room", {type:"join",data:responsePayload});
        socket.send(JSON.stringify(response))

        getRoom.getUsers().forEach((value,key)=>{
            if(socket!=value.getSocket()){
                const response = new Response(true,"Joined Room",{type:'join',data:{user:userData}})
                value.getSocket().send(JSON.stringify(response));
            }
        });




        console.log(userData.email+ " has joined in the room - "+joinPayload.roomCode)
    }

    // const handleMessage = (data: any) => {
    //     const payload = data as WebSocketMessagePayload;

    //     const getRoom = roomsMap.get(payload.roomId);

    //     const getSocketMap = getRoom?.getUsers();
    //     getSocketMap?.forEach((value: User, key: number) => {
    //         if (value.getSocket() != socket) {
    //             socket.send(JSON.stringify(payload.message));
    //         }
    //     })


    // }


    const handleClose = (data:any)=>{
        const {roomId,userId,roomType} = data as CloseConnectionType;
        if(roomType=="create"){
            roomsMap.delete(roomId);
            console.log(`Room deleted ${roomId}`)
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
        // message: handleMessage,
        close:handleClose
    }



    socket.on('message', (data) => {
        try {
            const payload = JSON.parse(data.toString()) as WebSocketConnectQuery;
            //@ts-ignore
            handlers[payload.type]?.(payload.data);
        } catch (error) {
            console.log(error)
        }
    })

    // socket.on('close',(data)=>{
    //     console.log(userData)
    //     console.log('socket disconnected for ')
    // })

})


