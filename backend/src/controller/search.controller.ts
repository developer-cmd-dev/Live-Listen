import type { Request, Response } from "express";
import { prisma } from "../utility/PrismaClient.js";



const searchController = async(req:Request,res:Response)=>{

    const query = req.params.name

    if(query){
 const searchResult =await prisma.songs.findMany({
    where:{
        name:query
    }
 })

  console.log(searchResult);

    }
 
    
  

    res.status(200).json(query)



}


export {searchController};