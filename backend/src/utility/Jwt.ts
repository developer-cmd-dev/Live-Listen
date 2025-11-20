import pkg from 'jsonwebtoken'

const  { JsonWebTokenError, TokenExpiredError,verify,sign } =pkg
import { CustomError } from '../error/ErrorHandler.js';
import {config} from 'dotenv'
config();

class Jwt{

    private secret:string;

    constructor(secret:string){
        this.secret=secret;
    }

    signToken(data:string,expirey:number) {
      return sign({
            data:data
        },this.secret,{expiresIn:expirey*expirey})
    }

    verifyToken(token:string){
        try{
           return verify(token,this.secret);
        }catch(error){
            if(error instanceof TokenExpiredError){
                throw new CustomError("Token expired",404);
            }else if(error instanceof JsonWebTokenError){
                throw new CustomError(error.message,404);
            }else{
                throw new CustomError("Something went wrong",404);
            }

           
        }
    }



}

export default new Jwt(process.env.JWT_SECRET||"");




