import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
config();
const secretKey = process.env.JWT_SECRET;
class Jwt {
    secretKey;
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    verifyToken(token) {
        return jwt.verify(token, this.secretKey);
    }
}
export default new Jwt(secretKey);
//# sourceMappingURL=JWT.js.map