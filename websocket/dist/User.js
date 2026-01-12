class User {
    userId;
    email;
    accessToken;
    isVerified = false;
    userSocket;
    constructor(userId, email, accessToken, isVerified) {
        this.userId = userId;
        this.email = email;
        this.accessToken = accessToken;
        this.isVerified = isVerified;
    }
    setUserSocket(socket) {
        this.userSocket = socket;
    }
    getSocket() {
        return this.userSocket;
    }
}
export default User;
//# sourceMappingURL=User.js.map