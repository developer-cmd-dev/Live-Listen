export class CustomError extends Error {
    statusCode = 0;
    constructor(message, statuscode) {
        //@ts-ignore
        super(message);
        this.statusCode = statuscode;
    }
}
//# sourceMappingURL=ErrorHandler.js.map