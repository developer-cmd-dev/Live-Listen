import type { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { email, jwt } from "zod";
import bcrypt from 'bcrypt'
import { CustomError } from "../error/ErrorHandler.js";
import Jwt from "../utility/Jwt.js";
import type { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

type UserData = {
    email: string;
    password: string;
}



const fetchUser = async(email:string)=>{
 return await prisma.user.findFirst({
            where: {
                email: email
            },

        });
}



interface ClientResponse {
    token:string|null,
    userData:{
        email:string|undefined;
    }
}





const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
console.log(req.headers)
    if (req.headers.authorization) {
        const extractToken = req.headers.authorization.replace("Bearer ", "")
        const verifyToken = Jwt.verifyToken(extractToken);
        //@ts-ignore
        const userData = await fetchUser(verifyToken.data);

        const response:ClientResponse={
            token:null,
            userData:{
                email:userData?.email
            }
        }

        if(verifyToken){
            res.status(200).json(response);
        }
        
    } else {
        const userData: UserData = req.body;
        if(!userData) throw new CustomError("Empty User field",404);
        const getUser =await fetchUser(userData.email);

        if (getUser) {
            const comparedPassw = await bcrypt.compare(userData.password, getUser.password);
            if (comparedPassw) {
                const accessToken = Jwt.createAccessToken(getUser.email);
                const response:ClientResponse={
                    token:accessToken,
                    userData:{
                        email:userData.email
                    }
                }
                res.status(200).json(response)
            } else {
                throw new CustomError("Password not matched", 401)
            }

        } else {
            throw new CustomError("User not found", 404)
        }
    }




}

export default authMiddleware;