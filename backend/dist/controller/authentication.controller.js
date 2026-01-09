import { CustomError } from "../error/ErrorHandler.js";
import Jwt from "../utility/Jwt.js";
import { prisma } from "../utility/PrismaClient.js";
import { email } from "zod";
import { convertTypeAcquisitionFromJson } from "typescript";
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies['refresh-token'];
    if (!refreshToken)
        new CustomError("Empty Refresh Token", 404);
    const verifyToken = Jwt.verifyToken(refreshToken);
    if (!verifyToken)
        new CustomError("Refresh Token Expired", 401);
    const accessToken = Jwt.createAccessToken(verifyToken.data);
    res.status(200).json({ accessToken: accessToken });
};
const googleAuthController = async (req, res) => {
    try {
        const userData = req.user;
        if (userData) {
            const response = await prisma.user.upsert({
                where: {
                    email: userData.email
                },
                update: {},
                create: {
                    email: userData.email,
                    name: userData.name,
                    password: null,
                },
                select: {
                    email: true,
                    name: true,
                    playlist: true,
                }
            });
            const accessToken = Jwt.createAccessToken(response.email);
            const refreshToken = Jwt.createRefreshToken(response.email);
            res.cookie("refresh-token", refreshToken, { httpOnly: true, secure: false, sameSite: "lax" });
            res.status(200).json({ userData: response, accessToken: accessToken });
        }
    }
    catch (error) {
        if (error instanceof Error)
            throw new CustomError(error.message, 500);
    }
};
export { refreshToken, googleAuthController };
//# sourceMappingURL=authentication.controller.js.map