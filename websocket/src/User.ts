import type WebSocket from "ws";


class User{
    public userId:number;
    public email:string;
    public accessToken:string;
    public isVerified:boolean=false;
    private userSocket:any;
    constructor(userId:number,email:string,accessToken:string,isVerified:boolean){
        this.userId=userId;
        this.email=email;
        this.accessToken=accessToken;
        this.isVerified=isVerified
        
    }

    setUserSocket(socket:WebSocket){
        this.userSocket=socket
    }
    getSocket(){
        return this.userSocket;
    }
}


export default User;
