export class CustomError extends Error {
    statuscode;
    constructor(message, statuscode) {
        //@ts-ignore
        super(message);
        this.statuscode = statuscode;
    }
}
//# sourceMappingURL=ErrorHandler.js.map