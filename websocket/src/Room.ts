import type WebSocket from "ws";
import type User from "./User.js";

class Room{

    private roomId:number;
     email:string;
     userId:number;
     roomName:string|undefined;
     enabledChat:boolean;
     isPrivate:boolean;
     userLimit:number;
     users=new Map<number,User>();
    

    constructor(roomId:number,email:string,userId:number,roomName:string|undefined,enabledChat:boolean,isPrivate:boolean,userLimit:number){
        this.roomId=roomId;
        this.email=email;
        this.userId=userId;
        this.roomName=roomName;
        this.enabledChat=enabledChat;
        this.isPrivate=isPrivate;
        this.userLimit=userLimit;
    }

    setUser(user:User,userId:number){
        this.users.set(userId,user)
    }

    destroyUser(userId:number){
       this.users.delete(userId);
    }

    getUsers(){return this.users};
    getRoomId(){return this.roomId};
    
    toJson() {
        return {
            roomId: this.roomId,
            email: this.email,
            userId: this.userId,
            roomName: this.roomName,
            enabledChat: this.enabledChat,
            isPrivate: this.isPrivate,
            userLimit: this.userLimit,
            users: 
                Array.from(this.users.entries()).map(([userId, user]) => ({
                    userId: user.userId,
                    email: user.email,
                    isVerified: user.isVerified
                }))
            
        }
    }

}

export default Room;