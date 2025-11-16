import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/ErrorHandler.js";
declare const ErrorMiddleware: (err: CustomError, req: Request, res: Response, next: NextFunction) => void;
export default ErrorMiddleware;
//# sourceMappingURL=error.middleware.d.ts.map