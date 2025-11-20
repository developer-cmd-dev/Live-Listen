import { prisma } from "../utility/PrismaClient.js";
import { CustomError } from "../error/ErrorHandler.js";
const createPlaylist = async (req, res) => {
    const { name, isPrivate } = req.body;
    const userData = res.locals;
    try {
        const playlistResponse = await prisma.playlist.create({
            data: {
                playlist_name: name,
                private: isPrivate,
                user: userData
            }
        });
        res.status(200).json(playlistResponse);
    }
    catch (error) {
        if (error instanceof Error)
            throw new CustomError(error.message, 500);
    }
};
export { createPlaylist };
//# sourceMappingURL=playlist.controller.js.map