import type User from "./User.js";
declare class Room {
    private roomId;
    name: string;
    userId: number;
    users: Map<number, User>;
    constructor(roomId: number, name: string, userId: number);
    setUser(user: User, userId: number): void;
    destroyUser(userId: number): void;
    getUsers(): Map<number, User>;
    getRoomId(): number;
}
export default Room;
//# sourceMappingURL=Room.d.ts.map