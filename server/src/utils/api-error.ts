export class ApiError extends Error {
    statusCode: number;
    success: boolean;
    error: any[];
    constructor(statusCode: number, message: string, error = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.error = error;

        if (stack) {
            //  if stack is provided
            this.stack = stack;
        } else {
            // else capture stack trace from Error
            Error.captureStackTrace(this, this.constructor);
        }
    }
}