import jwt from 'jsonwebtoken';
import { CustomError } from '../error/ErrorHandler.js';
import { config } from 'dotenv';
config();
class Jwt {
    secret;
    constructor(secret) {
        this.secret = secret;
    }
    sign(data, expirey) {
        return jwt.sign({
            data: data
        }, this.secret, { expiresIn: expirey * expirey });
    }
    verify(token) {
        try {
            return jwt.verify(token, this.secret);
        }
        catch (error) {
            throw new CustomError("Token expired", 404);
        }
    }
}
export default new Jwt(process.env.JWT_SECRET || "");
//# sourceMappingURL=Jwt.js.map