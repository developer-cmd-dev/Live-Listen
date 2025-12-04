import { prisma } from "../utility/PrismaClient.js";
import redisClient from "../utility/RedisClient.js";
import { CustomError } from "../error/ErrorHandler.js";
const startJam = async (req, res) => {
    const { limit, adminPlay, isChatOpen } = req.body;
    const user = res.locals;
    try {
        const roomId = Math.floor(Math.random() * 100000);
        const response = await prisma.rooms.create({
            data: {
                roomId: roomId,
                limit: limit,
                adminPlay: adminPlay,
                isChatOpen: isChatOpen,
                userId: user.id,
            }
        });
        redisClient.hSet(`activeRooms:${response.roomId}`, {
            roomId: String(response.roomId),
            limit: String(response.limit),
            adminPlay: String(response.adminPlay),
            isChatOpen: String(response.isChatOpen)
        });
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error)
            throw new CustomError(error.message, 500);
    }
};
export { startJam };
//# sourceMappingURL=jamming.controller.js.map