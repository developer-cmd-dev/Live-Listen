import { application } from "express";
import axios from "axios";
import { config } from "dotenv";
import { CustomError } from "../error/ErrorHandler.js";
import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
config();
const prisma = new PrismaClient();
const dashboard = async (req, res) => {
    // Album
    try {
        // const albumDataResponse = await axios.get(`https://api.jamendo.com/v3.0/albums/?client_id=${process.env.JAMENDO_CLIENT_ID}&limit=20&format=jsonpretty&type=album+single`)
        // const albumDataArr:AlbumData[]=albumDataResponse.data.results;
        // const cleanedData = albumDataArr.map(({id,...rest})=>rest);
        // const response =await prisma.album.createMany({
        //     data:[
        //         ...cleanedData
        //     ],
        //     skipDuplicates:true
        // })
        //Playlist
        const playlistDataResponse = await axios.get(`https://api.jamendo.com/v3.0/playlists/?client_id=${process.env.JAMENDO_CLIENT_ID}&format=jsonpretty&datebetween=2012-01-01_2012-02-01`);
        const playlistData = playlistDataResponse.data.results;
        const cleanedData = playlistData.map(({ id, ...rest }) => rest);
        const response = prisma.playlist.createManyAndReturn({
            data: [
                ...cleanedData
            ],
            skipDuplicates: true
        });
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        throw new CustomError("Something went wrong with Jamendo", 500);
    }
};
export { dashboard };
//# sourceMappingURL=dashboard.controller.js.map