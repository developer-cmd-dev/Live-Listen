import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/ErrorHandler.js";



const ErrorMiddleware = (err:CustomError,req:Request,res:Response ,next:NextFunction)=>{
    if(err instanceof Error){
        res.status(err.statusCode).json(err.message);
    }else{
        res.status(500).json("Internal Server Error");
    }
    next();
}

export default ErrorMiddleware;