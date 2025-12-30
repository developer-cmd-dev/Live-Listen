import type { Request, Response } from "express";
import { CustomError } from "../error/ErrorHandler.js";
import Jwt from "../utility/Jwt.js";
import type { JwtPayload } from "jsonwebtoken";

interface UserDataPayload {
    data:string
}

const refreshToken = async(req:Request,res:Response)=>{
        const refreshToken = req.cookies['refresh-token'];
        if(!refreshToken) new CustomError("Empty Refresh Token",404);
        const verifyToken = Jwt.verifyToken(refreshToken) as UserDataPayload;
        if(!verifyToken) new CustomError("Refresh Token Expired",401);
        const accessToken =  Jwt.createAccessToken(verifyToken.data);
        res.status(200).json({accessToken:accessToken})
}

export {refreshToken}