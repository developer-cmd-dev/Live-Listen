import { config } from "dotenv";
import { OAuth2Client } from "google-auth-library";
config();
const clientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);
const googleVerify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId,
    });
    const payload = ticket.getPayload();
    if (payload) {
        const userData = {
            googleId: payload.sub,
            email: payload.email,
            name: payload.name,
            avatar: payload.picture,
            emailVerified: payload.email_verified,
        };
        return userData;
    }
};
export default googleVerify;
//# sourceMappingURL=googleVerify.js.map