import pkg from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError, verify, sign } = pkg;
import { config } from 'dotenv';
config();
class Jwt {
    secret;
    constructor(secret) {
        this.secret = secret;
    }
    createRefreshToken(data) {
        return sign({
            data: data
        }, this.secret, { expiresIn: '30d' });
    }
    createAccessToken(data) {
        return sign({
            data: data
        }, this.secret, { expiresIn: '5m' });
    }
    verifyToken(token) {
        return verify(token, this.secret);
    }
}
export default new Jwt(process.env.JWT_SECRET || "");
//# sourceMappingURL=Jwt.js.map