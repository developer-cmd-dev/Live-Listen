import { PrismaClient } from "@prisma/client";
import { email, jwt } from "zod";
import bcrypt from 'bcrypt';
import { CustomError } from "../error/ErrorHandler.js";
import Jwt from "../utility/Jwt.js";
const prisma = new PrismaClient();
const fetchUser = async (email) => {
    return await prisma.user.findFirst({
        where: {
            email: email
        },
    });
};
const authMiddleware = async (req, res, next) => {
    if (req.headers.authorization) {
        const extractToken = req.headers.authorization.replace("Bearer ", "");
        const verifyToken = Jwt.verifyToken(extractToken);
        //@ts-ignore
        const userData = await fetchUser(verifyToken.data);
        if (userData)
            res.locals = userData;
        if (verifyToken)
            next();
    }
    else {
        const userData = req.body;
        const getUser = await fetchUser(userData.email);
        if (getUser) {
            const comparedPassw = await bcrypt.compare(userData.password, getUser.password);
            if (comparedPassw) {
                const accessToken = Jwt.signToken(getUser.email, 60);
                res.cookie("Access-Token", accessToken);
                res.locals = getUser;
                next();
            }
            else {
                throw new CustomError("Password not matched", 401);
            }
        }
        else {
            throw new CustomError("User not found", 404);
        }
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map