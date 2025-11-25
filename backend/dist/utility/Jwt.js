import pkg from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError, verify, sign } = pkg;
import { CustomError } from '../error/ErrorHandler.js';
import { config } from 'dotenv';
config();
class Jwt {
    secret;
    constructor(secret) {
        this.secret = secret;
    }
    signToken(data, expirey) {
        return sign({
            data: data
        }, this.secret, { expiresIn: expirey * expirey });
    }
    verifyToken(token) {
        try {
            return verify(token, this.secret);
        }
        catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new CustomError("Token expired", 401);
            }
            else if (error instanceof JsonWebTokenError) {
                throw new CustomError(error.message, 401);
            }
            else {
                throw new CustomError("Something went wrong", 401);
            }
        }
    }
}
export default new Jwt(process.env.JWT_SECRET || "");
//# sourceMappingURL=Jwt.js.map