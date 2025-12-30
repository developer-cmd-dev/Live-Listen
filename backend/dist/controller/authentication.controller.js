import { CustomError } from "../error/ErrorHandler.js";
import Jwt from "../utility/Jwt.js";
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies['refresh-token'];
    if (!refreshToken)
        new CustomError("Empty Refresh Token", 404);
    const verifyToken = Jwt.verifyToken(refreshToken);
    if (!verifyToken)
        new CustomError("Refresh Token Expired", 401);
    const accessToken = Jwt.createAccessToken(verifyToken.data);
    res.status(200).json({ accessToken: accessToken });
};
export { refreshToken };
//# sourceMappingURL=authentication.controller.js.map