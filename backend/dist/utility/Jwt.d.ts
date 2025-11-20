import pkg from 'jsonwebtoken';
declare class Jwt {
    private secret;
    constructor(secret: string);
    signToken(data: string, expirey: number): string;
    verifyToken(token: string): string | pkg.JwtPayload;
}
declare const _default: Jwt;
export default _default;
//# sourceMappingURL=Jwt.d.ts.map