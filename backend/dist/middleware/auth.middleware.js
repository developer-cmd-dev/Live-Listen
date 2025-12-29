import { Prisma, PrismaClient } from "@prisma/client";
import { email, jwt } from "zod";
import bcrypt from 'bcrypt';
import { CustomError } from "../error/ErrorHandler.js";
import Jwt from "../utility/Jwt.js";
const prisma = new PrismaClient();
const authMiddleware = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const tokenPayload = req.headers.authorization;
            const extractToken = tokenPayload.replace("Bearer ", "");
            const userPayload = Jwt.verifyToken(extractToken);
            const refreshToken = await prisma.refreshToken.findUnique({ where: { userEmail: userPayload.data } });
            if (refreshToken) {
                const verifyRefreshToken = Jwt.verifyToken(refreshToken?.token);
            }
            res.status(200).json(true);
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(false);
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map