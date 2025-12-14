class Room {
    roomId;
    name;
    userId;
    users = new Map();
    constructor(roomId, name, userId) {
        this.roomId = roomId;
        this.name = name;
        this.userId = userId;
    }
    setUser(user, userId) {
        this.users.set(userId, user);
    }
    destroyUser(userId) {
        this.users.delete(userId);
    }
    getUsers() { return this.users; }
    ;
    getRoomId() { return this.roomId; }
    ;
}
export default Room;
//# sourceMappingURL=Room.js.map