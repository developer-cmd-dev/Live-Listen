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
            }
        });
}



const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if (req.headers.authorization) {
        const extractToken = req.headers.authorization.replace("Bearer ", "")
        const verifyToken = Jwt.verifyToken(extractToken);
        //@ts-ignore
        console.log(verifyToken.data)
        if (verifyToken) next();
    } else {
        const userData: UserData = req.body;
        const getUser = await prisma.user.findFirst({
            where: {
                email: userData.email
            }
        });

        if (getUser) {
            const comparedPassw = await bcrypt.compare(userData.password, getUser.password);
            if (comparedPassw) {
                const accessToken = Jwt.signToken(getUser.email,60);
                res.cookie("Access-Token",accessToken);
                res.locals = getUser;
                next()
            } else {
                throw new CustomError("Password not matched", 401)
            }

        } else {
            throw new CustomError("User not found", 404)
        }
    }




}

export default authMiddleware;