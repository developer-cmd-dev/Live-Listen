import type { ConnectWebSocketQuery } from '../index.js';
export interface CloseConnectionType extends ConnectWebSocketQuery {
    data: {
        userId: number;
        roomType: "join" | "create";
        roomId: number;
    };
}