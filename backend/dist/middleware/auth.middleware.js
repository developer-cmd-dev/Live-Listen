import { PrismaClient } from "@prisma/client";
import { email } from "zod";
import bcrypt from 'bcrypt';
import { CustomError } from "../error/ErrorHandler.js";
const prisma = new PrismaClient();
const authMiddleware = async (req, res, next) => {
    const userData = req.body;
    const getUser = await prisma.user.findFirst({
        where: {
            email: userData.email
        }
    });
    if (getUser) {
        const comparedPassw = await bcrypt.compare(userData.password, getUser.password);
        if (comparedPassw) {
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
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map