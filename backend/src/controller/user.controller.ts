import type { NextFunction, Request, Response } from 'express'
import * as z from 'zod'
import { CustomError } from '../error/ErrorHandler.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();


const createUser = async(req:Request,res:Response)=>{
    const userSchema = z.object({
        email:z.email("Incorrect Email"),
        name:z.string("Incorrect Name formate"),
        password:z.string("Icorrect Password formate"),
    })

  
      const userData = req.body;
    const result = userSchema.safeParse(userData);
    if(result.error){
        throw new CustomError(result.error.message,404);
    }
    try {
    const {email,name,password}=result.data;
    const hashedPassword =await bcrypt.hash(password,10);

   const response = await prisma.user.create({
    data:{
        email:email,
        name:name,
        password:hashedPassword
    }
   })
    res.status(200).json("User signed up")
  } catch (error) {
    throw new CustomError("Something went wrong",500);
  }
    
}


export {createUser}