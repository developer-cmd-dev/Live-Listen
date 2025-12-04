import type { Request, Response } from "express";
import { prisma } from "../utility/PrismaClient.js";
import redisClient from "../utility/RedisClient.js";
import { CustomError } from "../error/ErrorHandler.js";
interface StartJam {
    roomId: number;
    private: boolean;
    whoCanPlay: "admin" | "guest";
    limit: number;
    chat: boolean
}

interface RoomsData {
    roomId: number;
    limit: number;
    adminPlay: boolean;
    isChatOpen: boolean;
}

const startJam = async (req: Request, res: Response) => {
    const {roomId,limit,adminPlay,isChatOpen}:RoomsData = req.body;
    const user = res.locals
    try {
       const response = await prisma.rooms.create({
            data:{
                roomId:roomId,
                limit:limit,
                adminPlay:adminPlay,
                isChatOpen:isChatOpen,
                userId:user.id,         
            }
        })

        redisClient.hSet(
            `activeRooms:${response.roomId}`,
            {
                roomId:String(response.roomId),
                limit:String(response.roomId),
                adminPlay:String(response.adminPlay),
                isChatOpen:String(response.isChatOpen)
            });
            res.status(200).json(response);
    } catch (error) {
        if(error instanceof Error) throw new CustomError(error.message,500);
    }
}






export { startJam }