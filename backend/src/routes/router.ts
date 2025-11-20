import { Router } from "express";
import { type Response,type Request } from "express";
import { CustomError } from "../error/ErrorHandler.js";
import { createUser, login } from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { dashboard } from "../controller/dashboard.controller.js";
import { searchController } from "../controller/search.controller.js";
const route = Router();



route.post("/signup",createUser);
route.get("/login",authMiddleware,login);
route.get("/dashboard",dashboard);
route.get("/dashboard/search/:name",searchController);



export default route;