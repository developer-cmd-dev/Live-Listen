import { Prisma, PrismaClient } from "@prisma/client";
import { email, jwt, success } from "zod";
import bcrypt from 'bcrypt';
import { CustomError } from "../error/ErrorHandler.js";
import Jwt from "../utility/Jwt.js";
const prisma = new PrismaClient();
const authMiddleware = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const tokenPayload = req.headers.authorization;
            const accessToken = tokenPayload.replace("Bearer ", "");
            const userPayload = Jwt.verifyToken(accessToken);
            res.locals.userPayload = userPayload.data;
            next();
        }
        else {
            const { email, password } = req.body;
            const userData = await prisma.user.findUnique({
                where: { email: email },
                select: {
                    id: true,
                    email: true,
                    playlist: true,
                    password: true
                }
            });
            if (userData == null)
                res.status(404).send("User not found");
            const comparePassword = await bcrypt.compare(password, userData?.password);
            if (!comparePassword)
                res.status(401).send("Invalid password");
            const accessToken = Jwt.createAccessToken(email);
            const refreshToken = Jwt.createRefreshToken(email);
            const response = {
                userData: {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    playlist: userData.playlist
                },
                accessToken: accessToken
            };
            res.cookie("refresh-token", refreshToken, { httpOnly: true, secure: false, sameSite: "lax" });
            res.status(200).json(response);
        }
    }
    catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statuscode).send(error.message);
        }
        else if (error instanceof Error) {
            res.status(500).send("Internal Server Error");
        }
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map