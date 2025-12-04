import redisClient from "./RedisClient.js";
const createRoom = async (socket, roomId) => {
    const createdRoomData = await redisClient.hGetAll(`activeRooms:${roomId}`);
    console.log(createdRoomData);
};
export { createRoom };
//# sourceMappingURL=Websocket.js.map