import { config } from 'dotenv';
import jwt from 'jsonwebtoken'

config()

const secretKey = process.env.JWT_SECRET

class Jwt {

    private secretKey:string;
    constructor(secretKey:string){
        this.secretKey=secretKey;
    }


    verifyToken(token:string){
     return jwt.verify(token,this.secretKey);
    }


}

export default new Jwt(secretKey as string);