import { Router } from "express";
import { type Response,type Request } from "express";
import { CustomError } from "../error/ErrorHandler.js";
import { createUser } from "../controller/user.controller.js";
const route = Router();



route.get("/",createUser)




export default route;