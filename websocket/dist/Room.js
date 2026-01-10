class Room {
    roomId;
    email;
    userId;
    roomName;
    enabledChat;
    isPrivate;
    userLimit;
    users = new Map();
    constructor(roomId, email, userId, roomName, enabledChat, isPrivate, userLimit) {
        this.roomId = roomId;
        this.email = email;
        this.userId = userId;
        this.roomName = roomName;
        this.enabledChat = enabledChat;
        this.isPrivate = isPrivate;
        this.userLimit = userLimit;
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