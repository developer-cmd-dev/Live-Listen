import type User from "./User.js";
declare class Room {
    private roomId;
    email: string;
    userId: number;
    roomName: string | undefined;
    enabledChat: boolean;
    isPrivate: boolean;
    userLimit: number;
    users: Map<number, User>;
    constructor(roomId: number, email: string, userId: number, roomName: string | undefined, enabledChat: boolean, isPrivate: boolean, userLimit: number);
    setUser(user: User, userId: number): void;
    destroyUser(userId: number): void;
    getUsers(): Map<number, User>;
    getRoomId(): number;
}
export default Room;
//# sourceMappingURL=Room.d.ts.map