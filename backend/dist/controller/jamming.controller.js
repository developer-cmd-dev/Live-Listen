import { prisma } from "../utility/PrismaClient.js";
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
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error)
            throw new CustomError(error.message, 500);
    }
};
export { startJam };
//# sourceMappingURL=jamming.controller.js.map