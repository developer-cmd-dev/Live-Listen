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