import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/ErrorHandler.js";
import z, { ZodError } from "zod";



const ErrorMiddleware = (err:CustomError,req:Request,res:Response ,next:NextFunction)=>{
     const status = err.statuscode ?? 500;
  const message = err.message ?? "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
  });
    next();
}

export default ErrorMiddleware;