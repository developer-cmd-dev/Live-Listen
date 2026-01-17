export interface CloseConnectionType {
    userId: number;
    roomType: "join" | "create";
    roomId: number;
}
export interface RoomCreatePayload {
    roomName?: string;
    userLimit: number;
    username: string;
    userId: number;
}
//# sourceMappingURL=types.d.ts.map