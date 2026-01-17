

export interface CreateRoom{
    type:string;
    data:CreateRoomData

}


export interface CreateRoomData{
    userId:number;
    roomName?: string;
    username:string;
    userLimit: number;
}

export interface JoinRoomData{
    roomCode:number;
    userId:number;
}


export interface UserAuthPayload{
    id:number;
    name:string;
    email:string;
    playlist:object

}


export interface CreatedRoomResponse{
    success:boolean,
    message:string,
    data:RoomDetails
}

export interface RoomDetails {
    roomId: number;
    email: string;
    userId: number;
    username: string;
    roomName?: string;
    userLimit: number;
    roomType: string;
    users: {
        userId: number;
        email: string;
        isVerified: boolean;
    }[] ;
}

export type WebSocketMessageType = "connect" | "create" | "join" | "close" | "message";


export interface WebSocketMessageResponse{
    message:string;
    success:boolean;
    data:{
        type:WebSocketMessageType;
        data:object|null;
    };
}