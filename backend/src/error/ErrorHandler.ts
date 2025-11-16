 export class CustomError extends Error{

    statusCode:number=0;
    constructor(message:String,statuscode:number){
        //@ts-ignore
        super(message)
        this.statusCode = statuscode;
    }


}

