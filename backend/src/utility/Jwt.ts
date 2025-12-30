import pkg from 'jsonwebtoken'

const  { JsonWebTokenError, TokenExpiredError,verify,sign } =pkg

import {config} from 'dotenv'
config();

class Jwt{

    private secret:string;

    constructor(secret:string){
        this.secret=secret;
    }

    createRefreshToken(data:string) {
      return sign({
            data:data
        },this.secret,{expiresIn:'30d'})
    }

    createAccessToken(data:string){
        return sign({
            data:data
        },this.secret,{expiresIn:'1h'})
    }

    verifyToken(token:string){
           return verify(token,this.secret);
      
    }



}

export default new Jwt(process.env.JWT_SECRET||"");




