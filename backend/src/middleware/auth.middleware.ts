import type { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { email, jwt } from "zod";
import bcrypt from 'bcrypt'
import { CustomError } from "../error/ErrorHandler.js";
import Jwt from "../utility/Jwt.js";
import type {  JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();







// const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     if (req.headers.authorization) {
//         const extractToken = req.headers.authorization.replace("Bearer ", "")
//         const verifyToken = Jwt.verifyToken(extractToken);

//         //@ts-ignore
//         const userData = await fetchUser(verifyToken.data);

//         if(userData){
//         const refreshToken =await prisma.refreshToken.findFirst({where:{userId:userData?.id},select:refreshTokenSelect});
//         if(refreshToken){

//         }
//         const verifyRefreshToken = Jwt.verifyToken()

//         }

//         const response:ClientResponse={
//             token:null,
//             userData:{
//                 email:userData?.email
//             }
//         }

//         if(verifyToken){
//             res.status(200).json(response);
//         }

//     } else {
//         const userData = req.body;
//         if(!userData) throw new CustomError("Empty User field",404);
//         const getUser =await fetchUser(userData.email);

//         if (getUser) {
//             const comparedPassw = await bcrypt.compare(userData.password, getUser.password);
//             if (comparedPassw) {
//                 const accessToken = Jwt.createAccessToken(getUser.email);
//                 const response:ClientResponse={
//                     token:accessToken,
//                     userData:{
//                         email:userData.email
//                     }
//                 }
//                 res.status(200).json(response)
//             } else {
//                 throw new CustomError("Password not matched", 401)
//             }

//         } else {
//             throw new CustomError("User not found", 404)
//         }
//     }




// }

type UserJwtPayload = {
    data:string;
}



const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization) {
            const tokenPayload = req.headers.authorization;
            const extractToken = tokenPayload.replace("Bearer ", "");

            const userPayload= Jwt.verifyToken(extractToken)as UserJwtPayload;
            const refreshToken = await prisma.refreshToken.findUnique({where:{userEmail:userPayload.data}});

            if(refreshToken){
                const verifyRefreshToken = Jwt.verifyToken(refreshToken?.token);
            }

            res.status(200).json(true)

        }
    } catch (error) {
        console.log(error)
        res.status(400).json(false)
    }
}




export default authMiddleware;