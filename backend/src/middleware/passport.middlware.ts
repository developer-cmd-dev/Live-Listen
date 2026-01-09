import type { NextFunction, Request, Response } from "express";
import passport from "passport";
import { email } from "zod";


const passportMiddleware = async (req:Request,res:Response,next:NextFunction)=>{

    passport.authenticate(
        "google",
        {
            session:false,
            scope:["profile","email"]
        },
        async(err,userData)=>{
            if(err) return next(err);
            req.body=userData;
            next()
        }
    )(req,res,next)


}

export default passportMiddleware;