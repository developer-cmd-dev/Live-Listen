class Room {
    roomId;
    users = [];
    constructor(roomId) {
        this.roomId = roomId;
    }
    setUser(user) {
        this.users.push(user);
    }
    getUsers() { return this.users; }
    ;
    getRoomId() { return this.roomId; }
    ;
}
export default Room;
//# sourceMappingURL=Room.js.map