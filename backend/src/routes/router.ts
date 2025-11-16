import { Router } from "express";
import { type Response,type Request } from "express";
import { CustomError } from "../error/ErrorHandler.js";
const route = Router();



route.get("/",(req,res)=>{
    throw new CustomError("This is error",505);
})




export default route;