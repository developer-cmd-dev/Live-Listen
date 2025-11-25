import { response, type Request, type Response } from "express";
import { prisma } from "../utility/PrismaClient.js";
import { CustomError } from "../error/ErrorHandler.js";
import { unknown } from "zod";
import { id } from "zod/locales";


type Playlist={
    playlist_name:string,
    isPrivate:boolean
}

type AddSong={
    playlistId:number
    songsId:[]
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



const updatePlaylist = async(req:Request,res:Response)=>{
        

        try {
            const playlistId = parseInt(req.params.id || "");
        const newData:Playlist = req.body;
        
            const response = await prisma.playlist.update({
                where:{
                    id:playlistId,
                },
                data:{
                       playlist_name:newData.playlist_name,
                        private:newData.isPrivate
                }
            })

            res.status(200).json(response);
        } catch (error:unknown) {
            if(error instanceof Error){
            throw new CustomError(error.message,500);

            }
        }
}


const deletePlaylist = async(req:Request,res:Response)=>{
try {
    
    const id = parseInt(req.params.id||"");
    const response = prisma.playlist.delete({
        where:{
            id:id
        },
        include:{
            playlistSongs:true
        }
    })
    res.status(200).json(response)

} catch (error:unknown) {
    if(error instanceof Error) throw new CustomError(error.message,404);
}    
}


const addSong = async (req:Request,res:Response)=>{
    const data:AddSong = req.body;

   
    try {
  
       const response = await prisma.playlistSongs.createMany({
            data:data.songsId.map((id)=>({
                playlistId:data.playlistId,
                songId:id,
            })),
            skipDuplicates:true
        })
      
      res.status(200).json(response)
    } catch (error:unknown) {
        if(error instanceof Error) throw new CustomError(error.message+"Message from playlist controller",500);
    }

}




export {createPlaylist,addSong,updatePlaylist,deletePlaylist}