class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message; // 'this' refers to the ExpressError instance created by the class ('Class' is basically a template that used to create objects)
        this.statusCode = statusCode; // 'Error' don't have built-in status code property
    }
}

export default ExpressError;