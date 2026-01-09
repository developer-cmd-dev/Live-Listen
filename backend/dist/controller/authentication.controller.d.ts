import type { Request, Response } from "express";
declare const refreshToken: (req: Request, res: Response) => Promise<void>;
declare const googleAuthController: (req: Request, res: Response) => Promise<void>;
export { refreshToken, googleAuthController };
//# sourceMappingURL=authentication.controller.d.ts.map