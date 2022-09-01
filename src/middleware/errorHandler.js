import typeError from "../libs/error/typeError";
import { statusError } from "../libs/error/statusError";

function handleHttpErrors (err, req, res, next) {
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        errCode: err.errCode ? err.errCode : -1,    // example -1, 0, 1, 2
        status: 'fail',
        typeError: err.typeError ? err.typeError : typeError.HTTP_ERROR,
        statusError: err.statusError ? err.statusError : statusError(500),
        message: err.message ? err.message : 'Server unknown error!',
        data: err.data ? err.data : {},
    })
}

module.exports = handleHttpErrors;