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
        const createdData = data.songsId.map((id) => ({ playlistId: data.playlistId, songsId: id }));
        const response = await prisma.playlistSongs.createMany({
            data: data.songsId.map((id) => ({
                playlistId: data.playlistId,
                songId: id,
            })),
            skipDuplicates: true
        });
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error)
            throw new CustomError(error.message + "Message from playlist controller", 500);
    }
};
const fetchPlaylist = async (req, res) => {
    const id = req.body.id;
    try {
        const response = await prisma.playlist.findUnique({
            where: {
                id: id
            },
            include: {
                playlistSongs: {
                    include: {
                        song: true
                    }
                },
            }
        });
        res.status(200).json(response);
    }
    catch (error) {
        throw new CustomError("Something went wrong", 500);
    }
};
export { createPlaylist, addSong, fetchPlaylist };
//# sourceMappingURL=playlist.controller.js.map