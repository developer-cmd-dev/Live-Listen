import type WebSocket from "ws";
declare const createRoom: (socket: WebSocket, roomId: string) => Promise<Map<string, WebSocket[]>>;
declare const joinRoom: (socket: WebSocket, roomId: string) => Promise<Map<string, WebSocket[]>>;
export { createRoom, joinRoom };
//# sourceMappingURL=Websocket.d.ts.map