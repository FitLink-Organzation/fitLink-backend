import { StatusCodes } from 'http-status-codes'

export default class BaseError extends Error {
    public statusCode: StatusCodes

    constructor(message: string, statusCode: StatusCodes = 500) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}
