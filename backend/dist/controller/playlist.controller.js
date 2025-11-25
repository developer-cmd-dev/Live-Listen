import { response } from "express";
import { prisma } from "../utility/PrismaClient.js";
import { CustomError } from "../error/ErrorHandler.js";
import { unknown } from "zod";
import { id } from "zod/locales";
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
const updatePlaylist = async (req, res) => {
    try {
        const playlistId = parseInt(req.params.id || "");
        const newData = req.body;
        const response = await prisma.playlist.update({
            where: {
                id: playlistId,
            },
            data: {
                playlist_name: newData.playlist_name,
                private: newData.isPrivate
            }
        });
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new CustomError(error.message, 500);
        }
    }
};
const addSong = async (req, res) => {
    const data = req.body;
    try {
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
export { createPlaylist, addSong, updatePlaylist };
//# sourceMappingURL=playlist.controller.js.map