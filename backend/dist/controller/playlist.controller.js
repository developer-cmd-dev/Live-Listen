import { prisma } from "../utility/PrismaClient.js";
import { CustomError } from "../error/ErrorHandler.js";
import { unknown } from "zod";
const createPlaylist = async (req, res) => {
    const { playlist_name, isPrivate } = req.body;
    const userData = res.locals;
    try {
        const playlistResponse = await prisma.playlist.create({
            data: {
                playlist_name: playlist_name,
                private: isPrivate,
                user: {
                    connect: { id: userData.id }
                }
            }
        });
        res.status(200).json(playlistResponse);
    }
    catch (error) {
        if (error instanceof Error)
            throw new CustomError(error.message, 500);
    }
};
const addSong = async (req, res) => {
    const data = req.body;
    try {
        const response = await prisma.playlistSongs.createManyAndReturn({
            data: data.songs.map((songId) => ({
                playlistId: data.playlistId,
                songId: songId
            })),
            skipDuplicates: true
        });
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error)
            throw new CustomError(error.message, 500);
    }
};
export { createPlaylist, addSong };
//# sourceMappingURL=playlist.controller.js.map