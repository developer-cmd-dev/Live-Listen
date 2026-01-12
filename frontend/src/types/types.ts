export interface SocketConnection{
    success:string;
    message:string;
    data:object;
}


export interface CreateRoom{
    type:string;
    data:{
        roomName?: string;
        enabledChat: boolean;
        isPrivate: false;
        userLimit: number;
    }

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
    roomName?: string;
    enabledChat: boolean;
    isPrivate: boolean;
    userLimit: number;
    users: {
        [userId: number]: {
            userId: number;
            email: string;
            isVerified: boolean;
        }
    };
}