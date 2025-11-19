import { application, type Request, type Response } from "express";
import axios from "axios";
import { config } from "dotenv"
import { CustomError } from "../error/ErrorHandler.js";
import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
import { number, string } from "zod";

config();
const prisma = new PrismaClient();


type DashboardData = {
    album: string,
    radio: string,
    tracks: string
}

type AlbumData = {
    id: string,
    name: string,
    releasedate: string,
    artist_id: string,
    artist_name: string
    image: string,
    zip: string,
    shorturl: string,
    shareurl: string,
    zip_allowed: boolean,
}

type PlaylistData = {
    id: string,
    name: string,
    creationdate: string,
    user_id: string,
    user_name: string,
    zip: string,
    shorturl: string,
    shareurl: string,
    createdAt: string,
    updatedAt: string,
}

type SongsData={
id:string,
name:string,
duration:number,
artist_id:string,
artist_name:string,
artist_idstr:string
album_name:string,
album_id:string,
license_ccurl:string,
position:number
releasedate:string,
album_image:string,
audio:string,
audiodownload:string,
prourl:string,
shorturl:string,
shareurl:string,
waveform:string,
image:string,
musicinfo:Object
audiodownload_allowed:boolean,
content_id_free:boolean,
}


const dashboard = async (req: Request, res: Response) => {

    try {

      

    } catch (error) {
        console.log(error)
        throw new CustomError("Something went wrong with Jamendo", 500);
    }


}


export { dashboard };