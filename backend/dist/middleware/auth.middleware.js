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
            const accessToken = tokenPayload.replace("Bearer ", "");
            const refreshToken = req.cookies['refresh-token'];
            console.log(refreshToken);
            const userPayload = Jwt.verifyToken(accessToken);
            if (refreshToken) {
                const verifyRefreshToken = Jwt.verifyToken(refreshToken?.token);
                console.log(verifyRefreshToken);
            }
            res.status(200).json(true);
        }
        else {
            const { email, password } = req.body;
            const userData = await prisma.user.findUnique({ where: { email: email }, include: { playlist: true } });
            const comparePassword = await bcrypt.compare(password, userData?.password);
            if (!comparePassword)
                throw new CustomError("Invalid Password", 401);
            const accessToken = Jwt.createAccessToken(email);
            const refreshToken = Jwt.createRefreshToken(email);
            const response = {
                message: "Success",
                data: {
                    userData: {
                        email: userData.email,
                        playlist: userData.playlist
                    },
                    accessToken: accessToken
                }
            };
            res.cookie("refresh-token", refreshToken, { httpOnly: true, secure: false, sameSite: "lax" });
            console.log(res.cookie);
            res.status(200).json(response);
        }
    }
    catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statuscode).json(error.message);
        }
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map