import jwt from 'jsonwebtoken';
declare class Jwt {
    private secret;
    constructor(secret: string);
    sign(data: string, expirey: number): string;
    verify(token: string): string | jwt.JwtPayload;
}
declare const _default: Jwt;
export default _default;
//# sourceMappingURL=Jwt.d.ts.map