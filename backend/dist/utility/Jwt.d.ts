import pkg from 'jsonwebtoken';
declare class Jwt {
    private secret;
    constructor(secret: string);
    createRefreshToken(data: string): string;
    createAccessToken(data: string): string;
    verifyToken(token: string): string | pkg.JwtPayload;
}
declare const _default: Jwt;
export default _default;
//# sourceMappingURL=Jwt.d.ts.map