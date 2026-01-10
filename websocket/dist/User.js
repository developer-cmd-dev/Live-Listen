class User {
    userId;
    email;
    accessToken;
    isVerified = false;
    userSocket;
    constructor(userId, email, accessToken, isVerified, socket) {
        this.userId = userId;
        this.email = email;
        this.accessToken = accessToken;
        this.isVerified = isVerified;
        this.userSocket = socket;
    }
}
export default User;
//# sourceMappingURL=User.js.map