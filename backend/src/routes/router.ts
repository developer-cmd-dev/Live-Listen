import { Router } from "express";
import { type Response,type Request } from "express";
import { CustomError } from "../error/ErrorHandler.js";
import { createUser, login } from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { dashboard } from "../controller/dashboard.controller.js";
import { searchController } from "../controller/search.controller.js";
import { addSong, createPlaylist } from "../controller/playlist.controller.js";
const route = Router();



route.post("/signup",createUser);
route.get("/login",authMiddleware,login);
route.get("/",dashboard);
route.get("/search/:name",searchController);
route.post("/create-playlist",authMiddleware,createPlaylist);
route.post("/add-song",authMiddleware,addSong)
route.post("/update-playlist",authMiddleware)




export default route;