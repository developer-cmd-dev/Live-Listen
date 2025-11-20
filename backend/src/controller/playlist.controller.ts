import type { Request, Response } from "express";
import { prisma } from "../utility/PrismaClient.js";
import { CustomError } from "../error/ErrorHandler.js";


type Playlist={
    name:string,
    isPrivate:boolean
}

const createPlaylist = async(req:Request,res:Response)=>{

    const {name,isPrivate}:Playlist=req.body
    const userData = res.locals;

    try {
        const playlistResponse = await prisma.playlist.create({
            data:{
                playlist_name:name,
                private:isPrivate,
                user:userData
            }
        })
        res.status(200).json(playlistResponse)
    } catch (error:unknown) {
        if(error instanceof Error) throw new CustomError(error.message,500);
    }




}

export {createPlaylist}