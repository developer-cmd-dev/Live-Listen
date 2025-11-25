import type { Request, Response } from "express";
import { prisma } from "../utility/PrismaClient.js";
import { CustomError } from "../error/ErrorHandler.js";
import { unknown } from "zod";


type Playlist={
    playlist_name:string,
    isPrivate:boolean
}

type AddSong={
    playlistId:number
    songs:[]
}

const createPlaylist = async(req:Request,res:Response)=>{

    const {playlist_name,isPrivate}:Playlist=req.body
    const userData = res.locals;

    try {
        const playlistResponse = await prisma.playlist.create({
            data:{
                playlist_name:playlist_name,
                private:isPrivate,
                user:{
                    connect:{id:userData.id}
                }
            }
        })
        res.status(200).json(playlistResponse)
    } catch (error:unknown) {
        if(error instanceof Error) throw new CustomError(error.message,500);
    }


}


const addSong = async (req:Request,res:Response)=>{
    const data:AddSong = req.body;
    try {
     const response = await prisma.playlistSongs.createManyAndReturn({
        data:data.songs.map((songId:number)=>({
            playlistId:data.playlistId,
            songId:songId
        })),
        skipDuplicates:true
      })
      
      res.status(200).json(response)
    } catch (error:unknown) {
        if(error instanceof Error) throw new CustomError(error.message,500);
    }

}

export {createPlaylist,addSong}