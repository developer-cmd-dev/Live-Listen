import redisClient from "./RedisClient.js";
const rooms = new Map();
const createRoom = async (socket, roomId) => {
    const activeRoomData = await redisClient.hGetAll(`activeRooms:${roomId}`);
    const users = [socket];
    rooms.set(activeRoomData.roomId || "", users);
    return rooms;
};
const joinRoom = async (socket, roomId) => {
    const rawData = await redisClient.hGetAll(`activeRooms:${roomId}`);
    const activeRoomData = {
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
        }
        else {
            socket.send("Limit reached");
        }
    }
    return rooms;
};
export { createRoom, joinRoom };
//# sourceMappingURL=Websocket.js.map