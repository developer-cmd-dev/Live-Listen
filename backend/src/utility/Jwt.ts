import  jwt from 'jsonwebtoken'
import { CustomError } from '../error/ErrorHandler.js';
import {config} from 'dotenv'
config();

class Jwt{

    private secret:string;

    constructor(secret:string){
        this.secret=secret;
    }

    sign(data:string,expirey:number) {
      return jwt.sign({
            data:data
        },this.secret,{expiresIn:expirey*expirey})
    }

    verify(token:string){
        try{
           return jwt.verify(token,this.secret);
        }catch(error){
            throw new CustomError("Token expired",404);
        }
    }



}

export default new Jwt(process.env.JWT_SECRET||"");