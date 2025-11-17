import type { NextFunction, Request, Response } from "express";
declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default authMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map