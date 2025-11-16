import { CustomError } from "../error/ErrorHandler.js";
import z, { ZodError } from "zod";
const ErrorMiddleware = (err, req, res, next) => {
    if (err instanceof Error) {
        res.status(err.statuscode).json(err.message);
    }
    else {
        res.status(500).json("Internal Server Error");
    }
    next();
};
export default ErrorMiddleware;
//# sourceMappingURL=error.middleware.js.map