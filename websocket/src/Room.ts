import type User from "./User.js";

class Room{

    private roomId:number;
    private users:User[]=[]

    constructor(roomId:number){
        this.roomId=roomId;
    }

    setUser(user:User){
        this.users.push(user)
    }

    getUsers(){return this.users};
    getRoomId(){return this.roomId};

}

export default Room;