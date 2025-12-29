import type { NextFunction, Request, Response } from 'express'
import * as z from 'zod'
import { CustomError } from '../error/ErrorHandler.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import Jwt from '../utility/Jwt.js';



const prisma = new PrismaClient();


const createUser = async (req: Request, res: Response) => {
  const userSchema = z.object({
    email: z.email("Incorrect Email"),
    name: z.string("Incorrect Name formate"),
    password: z.string("Icorrect Password formate"),
  })


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
    })

    const accessToken = Jwt.createAccessToken(response.email);
    const refreshToken = Jwt.createRefreshToken(response.email);

  const refreshTokenPayload = await prisma.refreshToken.create({
    data:{
      token:refreshToken,
      userEmail:response.email
    }
   })

    const responseObj = {
      id: response.id,
      email: response.email,
      name: response.name,
      accessToken: accessToken
    }

    res.status(200).json(responseObj)
  } catch (error) {
    throw new CustomError("User already exist", 409);
  }

}


const login = async (req: Request, res: Response) => {
  res.status(200).json("User Logged in successfully");
}


export { createUser, login }