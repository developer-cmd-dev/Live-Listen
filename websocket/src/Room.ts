import type WebSocket from "ws";
import type User from "./User.js";

class Room{

    private roomId:number;
    public name:string;
    public userId:number;
    private users=new Map<number,User>();
    

    constructor(roomId:number,name:string,userId:number){
        this.roomId=roomId;
        this.name=name;
        this.userId=userId;
    }

    setUser(user:User,userId:number){
        this.users.set(userId,user)
    }

    destroyUser(userId:number){
       this.users.delete(userId);
    }

    getUsers(){return this.users};
    getRoomId(){return this.roomId};
    

}

export default Room;