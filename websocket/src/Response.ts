class Response {
    success:boolean;
    message:string;
    constructor(success:boolean,message:string){
        this.message=message;
        this.success=success;
    }
}

export default Response; 