class Response {
    success:boolean;
    message:string;
    data:Object|null;
    constructor(success:boolean,message:string,data:Object|null){
        this.message=message;
        this.success=success;
        this.data=data;
    }
}

export default Response; 