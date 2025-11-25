import { type Request, type Response } from "express";
declare const createPlaylist: (req: Request, res: Response) => Promise<void>;
declare const updatePlaylist: (req: Request, res: Response) => Promise<void>;
declare const deletePlaylist: (req: Request, res: Response) => Promise<void>;
declare const addSong: (req: Request, res: Response) => Promise<void>;
export { createPlaylist, addSong, updatePlaylist, deletePlaylist };
//# sourceMappingURL=playlist.controller.d.ts.map