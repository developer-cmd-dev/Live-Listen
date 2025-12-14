import type WebSocket from "ws";
declare class User {
    userId: number;
    name: string;
    socket: any;
    constructor(userId: number, name: string, socket: WebSocket);
}
export default User;
//# sourceMappingURL=User.d.ts.map