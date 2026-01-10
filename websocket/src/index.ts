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

config();
let roomsMap = new Map<number, Room>();

type Query = {
    roomId: string;
    type: "create" | "join";
    email: string;
    userId: number;
};

type Type = "connect"|"create"|"join"|"message"

interface ConnectWebSocketQuery {
    type: Type;
    data:object;
}

interface UserPayload {
    email:string;
    userId:number;
    accessToken:string;
}

interface RoomCreatePayload{
    roomName?:string;
  enabledChat: boolean;
  isPrivate: false;
  userLimit: 10;
}


const port = 3001;


const wss = new WebSocketServer({ port: port });
console.log("Websocket is running on "+port)
wss.on('connection', (socket: WebSocket, req: IncomingMessage) => {

    // try {
    //     const getUrl = req.url;
    //     const parsedUrl = url.parse(getUrl || "");
    //     const { type,roomId, email, userId }: Query = parseQuery(parsedUrl.query || "") as unknown as Query;
        
    //     if (type === "create") {
    //         const room = new Room(roomId, email, userId);
    //         const user = new User(userId,email,socket);
    //         room.setUser(user, userId);
    //         roomsMap.set(roomId, room);
    //         socket.send(JSON.stringify(new Response(true,"success",{roomId:roomId})))
    //         console.log("Room created ",user.email, roomId)
    //     } else if (type === "join") {
    //         const hasRoom = roomsMap.has(roomId);
    //         const response = new Response(false, "Rooms has expired",null)
    //         if (!hasRoom) socket.send(JSON.stringify(response))

    //         const getRoom = roomsMap.get(roomId);
    //         getRoom?.setUser(new User(userId, email, socket), userId)

    //     }



        
    //     socket.on('message',(data)=>{
    //         const getRoom = roomsMap.get(roomId);
    //         const usersMap:Map<number,User> |undefined= getRoom?.users;

    //         const messageData:ChatMessage=JSON.parse(data.toLocaleString());

    //         messageData.date=Date.now()
            


    //         usersMap?.forEach(({userSocket})=>{
    //             if(userSocket!=socket){
    //                 userSocket.send(JSON.stringify(messageData))

    //             }
    //         })

    //     })



    //     socket.on('close', () => {
    //         console.log("socket has disconnected", roomId)
    //         if (type === "create") {
    //             roomsMap.delete(roomId);

    //         } else if (type === "join") {
    //             const getRoom = roomsMap.get(roomId);
    //             getRoom?.destroyUser(userId);
    //         }
    //     })


    // } catch (error) {
    //     console.log(error)
    // }

let userData:User;

    try {
        socket.on('message',(data)=>{
            const payload =JSON.parse(data.toString()) as ConnectWebSocketQuery;
            if(payload.type === "connect"){
                const userPayload = payload.data as UserPayload
                // const verifyToken = JWT.verifyToken(userPayload.accessToken);
                // if(!verifyToken) socket.send(JSON.stringify(new Response(false,"Invalid Credential",null)))
                    userData=new User(userPayload.userId,userPayload.email,userPayload.accessToken,true,socket);
                    socket.send(JSON.stringify(new Response(true,"Websocket connected",null)))
            }else if(payload.type==="create"){
                const {roomName,isPrivate,enabledChat,userLimit} = payload.data as RoomCreatePayload;
                const roomId = Math.floor(Math.random()*10000);
                if(!roomsMap.has(roomId)){
                    const room = new Room(roomId,userData.email,userData.userId,roomName,enabledChat,isPrivate,userLimit)
                    room.setUser(userData,userData.userId);
                    roomsMap.set(roomId,room);
                    socket.send(JSON.stringify(new Response(true,"Room created",{roomId:roomId})))
                    console.log(`Room created by ${userData.email} with ${roomId}`)
                }else{
                    socket.send(JSON.stringify(new Response(false,"Room has already created",null)));
                }
            }else if(payload.type === 'join'){
                const joinPayload = payload.data as {roomId:number};
                if(!joinPayload) socket.send(JSON.stringify(new Response(false,"invalid room id",null)));
                   const getRoom= roomsMap.get(joinPayload.roomId);
                   if(!getRoom) socket.send(JSON.stringify(new Response(false,"Room has expired",null)));
                   getRoom?.setUser(userData,userData.userId);
              
            }else if(payload.type === 'message'){
                
            }
        })
    } catch (error) {
        console.log(error)
    }

})