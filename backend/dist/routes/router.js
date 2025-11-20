import { Router } from "express";
import {} from "express";
import { CustomError } from "../error/ErrorHandler.js";
import { createUser, login } from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { dashboard } from "../controller/dashboard.controller.js";
import { searchController } from "../controller/search.controller.js";
import { createPlaylist } from "../controller/playlist.controller.js";
const route = Router();
route.post("/signup", createUser);
route.get("/login", authMiddleware, login);
route.get("/", dashboard);
route.get("/search/:name", searchController);
route.post("/create-playlist", authMiddleware, createPlaylist);
export default route;
//# sourceMappingURL=router.js.map