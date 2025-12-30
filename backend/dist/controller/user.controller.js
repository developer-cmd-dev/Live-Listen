import * as z from 'zod';
import { CustomError } from '../error/ErrorHandler.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import Jwt from '../utility/Jwt.js';
const prisma = new PrismaClient();
const createUser = async (req, res) => {
    const userSchema = z.object({
        email: z.email("Incorrect Email"),
        name: z.string("Incorrect Name formate"),
        password: z.string("Icorrect Password formate"),
    });
    const userData = req.body;
    const result = userSchema.safeParse(userData);
    if (result.error) {
        throw new CustomError(result.error.message, 404);
    }
    try {
        const { email, name, password } = result.data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword
            }
        });
        if (response)
            res.status(200).json({ message: "User signed up ", success: true });
    }
    catch (error) {
        throw new CustomError("User already exist", 409);
    }
};
const login = async (req, res) => {
    res.status(200).json("User Logged in successfully");
};
export { createUser, login };
//# sourceMappingURL=user.controller.js.map