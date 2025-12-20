import { application, type Request, type Response } from "express";
import axios from "axios";
import { config } from "dotenv"
import { CustomError } from "../error/ErrorHandler.js";
import { PrismaClient } from "@prisma/client";
import { redisClient } from "../utility/RedisClient.js";

config();
const prisma = new PrismaClient();



type DashboardData = {
    album: Object,
    songs: Object,
}


const dashboard = async (req: Request, res: Response) => {

    try {

        const cache = await redisClient.get("dashboard");


        if (!cache) {
            const albumData = await prisma.album.findMany({ take: 10 });
            const songsData = await prisma.songs.findMany({ take: 50 });
            const response: DashboardData = {
                album: albumData,
                songs: songsData
            }
            redisClient.set("dashboard", JSON.stringify(response));
            res.status(200).json(response)


        } else {
            res.status(200).json(JSON.parse(cache));

        }
    } catch (error) {
        console.log(error)
        throw new CustomError("Internal Server Error", 500);
    }


}


export { dashboard };