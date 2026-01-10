import type WebSocket from "ws";
declare class User {
    userId: number;
    email: string;
    accessToken: string;
    isVerified: boolean;
    userSocket: any;
    constructor(userId: number, email: string, accessToken: string, isVerified: boolean, socket: WebSocket);
}
export default User;
//# sourceMappingURL=User.d.ts.map