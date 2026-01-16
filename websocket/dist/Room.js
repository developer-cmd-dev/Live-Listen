class Room {
    roomId;
    email;
    username;
    userId;
    roomName;
    userLimit;
    users = new Map();
    constructor(roomId, email, username, userId, roomName, userLimit) {
        this.roomId = roomId;
        this.email = email;
        this.userId = userId;
        this.roomName = roomName;
        this.userLimit = userLimit;
        this.username = username;
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