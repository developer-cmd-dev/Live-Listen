export interface SocketConnection{
    success:string;
    message:string;
    data:object;
}


export interface CreateRoom{
    type:string;
    data:CreateRoomData

}


export interface CreateRoomData{
    roomName?: string;
    username:string;
    userLimit: number;
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
    data:RoomType
}

export interface RoomType {
    roomId: number;
    email: string;
    userId: number;
    username:string;
    roomName?: string;
    userLimit: number;
    roomType:string;
    users:[{
        userId: number;
        email: string;
        isVerified: boolean;
    }]|null;
}