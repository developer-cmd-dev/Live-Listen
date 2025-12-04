import type WebSocket from "ws";
import redisClient from "./RedisClient.js";




const createRoom=async(socket:WebSocket,roomId:string)=>{
const createdRoomData = await redisClient.hGetAll(`activeRooms:${roomId}`);
console.log(createdRoomData);    

}



export {createRoom}