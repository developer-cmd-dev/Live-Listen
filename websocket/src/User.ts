import type WebSocket from "ws";


class User{
    public userId:number;
    public email:string;
    public userSocket:any;
    constructor(userId:number,email:string,socket:WebSocket){
        this.userId=userId;
        this.email=email;
        this.userSocket=socket;
    }
}


export default User;
