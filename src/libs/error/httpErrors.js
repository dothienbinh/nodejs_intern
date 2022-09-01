import { StatusCodes } from "http-status-codes";
import typeError from './typeError';
import {statusError} from './statusError';

class HttpErrors {

    constructor(ob) {
        this.message = ob.message;
        this.statusCode = ob.statusCode;    // example: 200, 400, 402, 403
        this.typeError = ob.typeError;                // DataBase Error, Http Error
        this.statusError = ob.statusError   // Bad Request, Forbidden
    }

    set setMesssage(message) {
        this.message = message;
    }

    set setStatusCode(statusCode){
        this.statusCode = statusCode;
    }

    set setType(typeError) {
        this.typeError = typeError;
    }

    set setStatusError(statusError) {
        this.statusError = statusError;
    }

    static BadRequest(message, type) {
        const errorOption = {
            message: message,
            statusCode: StatusCodes.BAD_REQUEST,
            typeError: type ? type : typeError.HTTP_ERROR,
            statusError: statusError(StatusCodes.BAD_REQUEST),
        }
        return new HttpErrors(errorOption);
    }

    static Forbiden(message, type) {
        const errorOption = {
            message: message,
            statusCode: StatusCodes.FORBIDDEN,
            typeError: type ? type : typeError.HTTP_ERROR,
            statusError: statusError(StatusCodes.FORBIDDEN),
        }
        return new HttpErrors(errorOption);
    }

    static Conflict(message, type) {
        const errorOption = {
            message: message,
            statusCode: StatusCodes.CONFLICT,
            typeError: type ? type : typeError.HTTP_ERROR,
            statusError: statusError(StatusCodes.CONFLICT),
        }
        return new HttpErrors(errorOption);
    }

    static NotFound(message, type) {
        const errorOption = {
            message: message,
            statusCode: StatusCodes.NOT_FOUND,
            typeError: type ? type : typeError.HTTP_ERROR,
            statusError: statusError(StatusCodes.NOT_FOUND),
        }
        return new HttpErrors(errorOption);
    }

    static Unauthorized(message, type) {
        const errorOption = {
            message: message,
            statusCode: StatusCodes.UNAUTHORIZED,
            typeError: type ? type : typeError.HTTP_ERROR,
            statusError: statusError(StatusCodes.UNAUTHORIZED),
        }
        return new HttpErrors(errorOption);
    }

    static InvalidToken(message, type) {
        const errorOption = {
            message: message,
            statusCode: StatusCodes.BAD_REQUEST,
            typeError: type ? type : typeError.TOKEN_ERROR,
            statusError: statusError(StatusCodes.BAD_REQUEST),
        }
        return new HttpErrors(errorOption);
    }

    static ServerError(message) {
        const errorOption = {
            message: message,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            typeError: typeError.UNKNOW_ERROR,
            statusError: statusError(StatusCodes.INTERNAL_SERVER_ERROR),
        }
        return new HttpErrors(errorOption);
    }

    static IODataBase(message) {
        const errorOption = {
            message: message,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            typeError: typeError.DATABASE_ERROR,
            statusError: statusError(StatusCodes.INTERNAL_SERVER_ERROR),
        }
        return new HttpErrors(errorOption);
    }

    static UploadError(message) {
        const errorOption = {
            message: message ? message : 'Upload File Error!',
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            typeError: typeError.UPLOAD_ERROR,
            statusError: 'Upload file fail',
        }
        return new HttpErrors(errorOption);
    }
}

export default HttpErrors;