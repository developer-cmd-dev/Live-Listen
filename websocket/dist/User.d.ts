import type WebSocket from "ws";
declare class User {
    userId: number;
    email: string;
    accessToken: string;
    isVerified: boolean;
    private userSocket;
    constructor(userId: number, email: string, accessToken: string, isVerified: boolean);
    setUserSocket(socket: WebSocket): void;
    getSocket(): any;
}
export default User;
//# sourceMappingURL=User.d.ts.map