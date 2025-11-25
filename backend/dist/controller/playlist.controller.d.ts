import type { Request, Response } from "express";
declare const createPlaylist: (req: Request, res: Response) => Promise<void>;
declare const addSong: (req: Request, res: Response) => Promise<void>;
declare const fetchPlaylist: (req: Request, res: Response) => Promise<void>;
export { createPlaylist, addSong, fetchPlaylist };
//# sourceMappingURL=playlist.controller.d.ts.map