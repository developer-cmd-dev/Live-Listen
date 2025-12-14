import type WebSocket from "ws";


class User{
    public userId:number;
    public name:string;
    public socket:any;
    constructor(userId:number,name:string,socket:WebSocket){
        this.userId=userId;
        this.name=name;
        this.socket=socket;
    }
}


export default User;
