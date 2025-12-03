import type { Request, Response } from "express";
interface StartJam{
    roomId:number;
    private:boolean;
    whoCanPlay:"admin"|"guest";
    limit:number;
    chat:boolean
}

let cache:StartJam[]=[];


const startJam=async(req:Request,res:Response)=>{
        const body = req.body;
        try {
            const roomId:number = Math.floor(Math.random()*1000);
            cache.push({roomId,...body});
            res.status(200).json({roomId,...body})
        } catch (error) {
            console.log(error)
        }
}






export {startJam}