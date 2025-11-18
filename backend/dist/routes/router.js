import { Router } from "express";
import {} from "express";
import { CustomError } from "../error/ErrorHandler.js";
import { createUser, login } from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { dashboard } from "../controller/dashboard.controller.js";
const route = Router();
route.post("/signup", createUser);
route.get("/login", authMiddleware, login);
route.get("/dashboard", dashboard);
export default route;
//# sourceMappingURL=router.js.map