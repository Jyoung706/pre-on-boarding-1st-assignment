module.exports = class ErrorCreator extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);

        this.statusCode = statusCode || 500;
    }
};