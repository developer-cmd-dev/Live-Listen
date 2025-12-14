import type User from "./User.js";
declare class Room {
    private roomId;
    private users;
    constructor(roomId: number);
    setUser(user: User): void;
    getUsers(): User[];
    getRoomId(): number;
}
export default Room;
//# sourceMappingURL=Room.d.ts.map