import type WebSocket from "ws";
import redisClient from "./RedisClient.js";
import type { number } from "zod";


const rooms = new Map();


const createRoom=async(socket:WebSocket,roomId:string)=>{
const activeRoomData = await redisClient.hGetAll(`activeRooms:${roomId}`);
const users=[socket]
rooms.set(activeRoomData.roomId,users)

}


const joinRoom = async(socket:WebSocket,roomId:string)=>{
    const fetchUsers= await redisClient.hGetAll(`rooms:${roomId}`)
    const searchRoom = rooms.has(roomId);
    if(searchRoom){
        const getRoom = rooms.get(roomId);
        getRoom.push(socket)
        rooms.set(roomId,getRoom);
        console.log(rooms)
    }


    

}



export {createRoom,joinRoom}