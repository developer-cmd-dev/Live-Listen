import type User from "./User.js";
declare class Room {
    private roomId;
    email: string;
    username: string;
    userId: number;
    roomName: string | undefined;
    userLimit: number;
    users: Map<number, User>;
    constructor(roomId: number, email: string, username: string, userId: number, roomName: string | undefined, userLimit: number);
    setUser(user: User, userId: number): void;
    destroyUser(userId: number): void;
    getUsers(): Map<number, User>;
    getRoomId(): number;
    toJson(): {
        roomId: number;
        email: string;
        userId: number;
        roomName: string | undefined;
        userLimit: number;
        users: {
            userId: number;
            email: string;
            isVerified: boolean;
        }[];
    };
}
export default Room;
//# sourceMappingURL=Room.d.ts.map