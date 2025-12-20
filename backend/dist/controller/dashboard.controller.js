import { application } from "express";
import axios from "axios";
import { config } from "dotenv";
import { CustomError } from "../error/ErrorHandler.js";
import { PrismaClient } from "@prisma/client";
import { number, string } from "zod";
import { redisClient } from "../utility/RedisClient.js";
config();
const prisma = new PrismaClient();
const dashboard = async (req, res) => {
    try {
        const cache = await redisClient.get("dashboard");
        if (!cache) {
            const albumData = await prisma.album.findMany({ take: 10 });
            const songsData = await prisma.songs.findMany({ take: 50 });
            const response = {
                album: albumData,
                songs: songsData
            };
            redisClient.set("dashboard", JSON.stringify(response));
            res.status(200).json(response);
        }
        else {
            res.status(200).json(JSON.parse(cache));
        }
    }
    catch (error) {
        console.log(error);
        throw new CustomError("Internal Server Error", 500);
    }
};
export { dashboard };
//# sourceMappingURL=dashboard.controller.js.map