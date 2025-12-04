import type WebSocket from "ws";
declare const createRoom: (socket: WebSocket, roomId: string) => Promise<void>;
declare const joinRoom: (socket: WebSocket, roomId: string) => Promise<void>;
export { createRoom, joinRoom };
//# sourceMappingURL=Websocket.d.ts.map