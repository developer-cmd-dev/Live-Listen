import type WebSocket from "ws";
import redisClient from "./RedisClient.js";


const rooms = new Map<string,WebSocket[]>();


const createRoom = async (socket: WebSocket, roomId: string) => {
    const activeRoomData = await redisClient.hGetAll(`activeRooms:${roomId}`);
    const users = [socket]
    rooms.set(activeRoomData.roomId||"", users)
    return rooms;
}

interface ActiveRoomData {
    roomId: number | "";
    limit: number | 0;
    adminPlay: boolean | false;
    isChatOpen: boolean | false;
}


const joinRoom = async (socket: WebSocket, roomId: string) => {
    const rawData = await redisClient.hGetAll(`activeRooms:${roomId}`);
    const activeRoomData: ActiveRoomData = {
        roomId: Number(rawData.roomId),
        limit: Number(rawData.limit),
        adminPlay: rawData.adminPlay === "true",
        isChatOpen: rawData.isChatOpen === "true"
    };
    const searchRoom = rooms.has(roomId);
    if (searchRoom) {
        const getRoom = rooms.get(roomId);
        if (getRoom && getRoom.length <= activeRoomData.limit) {
            getRoom.push(socket);
            rooms.set(roomId, getRoom);
        }else{
            socket.send("Limit reached");
        }
    }
    return rooms;
}



export { createRoom, joinRoom }