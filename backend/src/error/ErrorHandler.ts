 export class CustomError extends Error{

    statuscode:number;
    constructor(message:String,statuscode:number){
        //@ts-ignore
        super(message)
        this.statuscode = statuscode;
    }


}

