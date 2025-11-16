import { Router } from "express";
import {} from "express";
import { CustomError } from "../error/ErrorHandler.js";
import { createUser } from "../controller/user.controller.js";
const route = Router();
route.get("/", createUser);
export default route;
//# sourceMappingURL=router.js.map