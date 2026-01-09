import passport from "../config/passport.js";
import { email } from "zod";
const passportMiddleware = async (req, res, next) => {
    passport.authenticate("google", {
        session: false,
        scope: ["profile", "email"]
    }, async (err, userData) => {
        console.log(userData);
    })(req, res, next);
};
export default passportMiddleware;
//# sourceMappingURL=passport.middlware.js.map