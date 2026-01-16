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
    toJson() {
        return {
            roomId: this.roomId,
            email: this.email,
            userId: this.userId,
            roomName: this.roomName,
            enabledChat: this.enabledChat,
            isPrivate: this.isPrivate,
            userLimit: this.userLimit,
            users: Array.from(this.users.entries()).map(([userId, user]) => ({
                userId: user.userId,
                email: user.email,
                isVerified: user.isVerified
            }))
        };
    }
}
export default Room;
//# sourceMappingURL=Room.js.map