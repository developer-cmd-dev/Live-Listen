import type { ConnectWebSocketQuery } from '../index.js';
export interface CloseConnectionType  {

        userId: number;
        roomType: "join" | "create";
        roomId: number;
    
}

export interface RoomCreatePayload {
        roomName?: string;
        userLimit: number;
        usename:string;
    }