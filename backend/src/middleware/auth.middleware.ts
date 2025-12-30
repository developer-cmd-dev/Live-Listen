import type { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { email, jwt, success } from "zod";
import bcrypt from 'bcrypt'
import { CustomError } from "../error/ErrorHandler.js";
import Jwt from "../utility/Jwt.js";
import type { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();








type UserJwtPayload = {
    data: string;
}

type UserData = {
    email:string;
    password:string;
    playlist:object
} 


const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization) {
        const tokenPayload = req.headers.authorization;
        const accessToken = tokenPayload.replace("Bearer ", "");
        const userPayload = Jwt.verifyToken(accessToken) as UserJwtPayload;
        res.status(200).json({message:"User signed in",success:true})

    }else{

        const {email,password}=req.body;
        const userData =await prisma.user.findUnique({where:{email:email},include:{playlist:true}}) as UserData;
        const comparePassword =await bcrypt.compare(password,userData?.password);
        if(!comparePassword) throw new CustomError("Invalid Password",401);

        const accessToken = Jwt.createAccessToken(email);
        const refreshToken = Jwt.createRefreshToken(email);

        const response = {
            message:"Success",
            data:{
                userData:{
                    email:userData.email,
                    playlist:userData.playlist
                },
                accessToken:accessToken
            }
        }

        res.cookie("refresh-token",refreshToken,{httpOnly:true,secure:false,sameSite:"lax"});
        console.log(res.cookie)
        res.status(200).json(response);

        
    }
    } catch (error) {
        if(error instanceof CustomError){
            res.status(error.statuscode).json(error.message);
        }
    }

}




export default authMiddleware;