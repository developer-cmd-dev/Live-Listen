import jwt from 'jsonwebtoken';
declare class Jwt {
    private secretKey;
    constructor(secretKey: string);
    verifyToken(token: string): string | jwt.JwtPayload;
}
declare const _default: Jwt;
export default _default;
//# sourceMappingURL=JWT.d.ts.map