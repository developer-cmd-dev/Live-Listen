import googleVerify from "../utility/googleVerify.js";
import axios from "axios";
import { config } from "dotenv";
config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const googleAuthMiddleware = async (req, res, next) => {
    try {
        const code = req.body.data;
        if (code) {
            const data = {
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": "postmessage",
                "grant_type": "authorization_code"
            };
            const getToken = await axios.post("https://oauth2.googleapis.com/token", data);
            const getPayload = await googleVerify(getToken.data.id_token);
            req.user = getPayload;
            next();
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export default googleAuthMiddleware;
//# sourceMappingURL=googleAuthMiddleware.js.map