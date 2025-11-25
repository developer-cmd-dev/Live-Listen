import { application, type Request, type Response } from "express";
import axios from "axios";
import { config } from "dotenv"
import { CustomError } from "../error/ErrorHandler.js";
import { PrismaClient } from "@prisma/client";
import { number, string } from "zod";

config();
const prisma = new PrismaClient();



type DashboardData={
    album:Object,
    songs:Object,
}


const dashboard = async (req: Request, res: Response) => {

    try {

        const albumData = await prisma.album.findMany({take:10});
        const songsData = await prisma.songs.findMany({take:50});

        const response:DashboardData={
            album:albumData,
            songs:songsData
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        throw new CustomError("Internal Server Error", 500);
    }


}


export { dashboard };