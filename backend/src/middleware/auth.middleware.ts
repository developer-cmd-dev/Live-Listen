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
    id: number;
    name: string;
    email: string;
    password: string;
    playlist: []
}



const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {


    try {
        if (req.headers.authorization) {
            const tokenPayload = req.headers.authorization;
            const accessToken = tokenPayload.replace("Bearer ", "");
            const userPayload = Jwt.verifyToken(accessToken) as UserJwtPayload;
            res.locals.userPayload = userPayload.data;
            next()

        } else {

            const { email, password } = req.body;
            const userData:UserData = await prisma.user.findUnique({
                where: { email: email },
                select: {
                    id: true,
                    email: true,
                    playlist: true,
                    password: true
                }
            }) as UserData;
            if (userData == null) res.status(404).send("User not found")
            const comparePassword = await bcrypt.compare(password, userData?.password);
            if (!comparePassword) res.status(401).send("Invalid password")

            const accessToken = Jwt.createAccessToken(email);
            const refreshToken = Jwt.createRefreshToken(email);

            const response = {
                userData: {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    playlist: userData.playlist
                },
                accessToken: accessToken
            }

            res.cookie("refresh-token", refreshToken, { httpOnly: true, secure: false, sameSite: "lax" });
            res.status(200).json(response);

        }
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statuscode).send(error.message);
        } else if (error instanceof Error) {
            res.status(500).send("Internal Server Error")
        }
    }



}




export default authMiddleware;