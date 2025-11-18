import { application, type Request, type Response } from "express";
import axios from "axios";
import { config } from "dotenv"
import { CustomError } from "../error/ErrorHandler.js";
import { PrismaClient } from "@prisma/client";

config();
const prisma = new PrismaClient();


type DashboardData={
    album:string,
    radio:string,
    tracks:string
}


const dashboard = async (req: Request, res: Response) => {

    // Album
    try {

        const albumDataResponse = await axios.get(`https://api.jamendo.com/v3.0/albums/?client_id=${process.env.JAMENDO_CLIENT_ID}&limit=20&format=jsonpretty&type=album+single`)

        const response =await prisma.album.createMany({
            data:[
                ...albumDataResponse.data.results
            ],
            skipDuplicates:true
        })

        
        
        

        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        throw new CustomError("Something went wrong with Jamendo",500);
    }


}


export {dashboard};