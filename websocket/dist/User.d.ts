import type WebSocket from "ws";
declare class User {
    userId: number;
    email: string;
    userSocket: any;
    constructor(userId: number, email: string, socket: WebSocket);
}
export default User;
//# sourceMappingURL=User.d.ts.map