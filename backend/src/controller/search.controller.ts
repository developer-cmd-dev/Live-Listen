import type { Request, Response } from "express";
import { prisma } from "../utility/PrismaClient.js";
import { CustomError } from "../error/ErrorHandler.js";



const searchController = async(req:Request,res:Response)=>{

    const query = req.params.name

  try {
      if(!query) throw new CustomError("Empty Query",404);
        // const searchResult =await prisma.songs.findMany({
        //     where:{
        //        OR:[ {name:{
        //             search:`plainto_tsquery('english', '${query}')`
        //         }}]
        //     }
        // })

        const searchResult = await prisma.$queryRawUnsafe(`
          SELECT * FROM 
              "Songs"
              WHERE to_tsvector('english',name) @@ websearch_to_tsquery('english',$1)
          `,query);

  





        res.status(200).json(searchResult)
 
    
  } catch (error) {
    console.log(error)
    throw new CustomError("Internal Server Error",505);
  }
  




}


export {searchController};