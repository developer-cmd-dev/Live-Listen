export interface CloseConnectionType {
    userId: number;
    roomType: "join" | "create";
    roomId: number;
}
export interface RoomCreatePayload {
    roomName?: string;
    userLimit: number;
    usename: string;
}
//# sourceMappingURL=types.d.ts.map