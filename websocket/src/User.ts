import type WebSocket from "ws";


class User{
    public userId:number;
    public email:string;
    public accessToken:string;
    public isVerified:boolean=false;
    public userSocket:any;
    constructor(userId:number,email:string,accessToken:string,isVerified:boolean,socket:WebSocket){
        this.userId=userId;
        this.email=email;
        this.accessToken=accessToken;
        this.isVerified=isVerified
        this.userSocket=socket;
    }
}


export default User;
