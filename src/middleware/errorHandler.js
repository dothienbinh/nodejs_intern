
import {StatusCodes} from 'http-status-code';

function handleHttpErrors (err, req, res, next) {
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        status: 'fail',
        message: err.message,
        data: StatusCodes.BAD_REQUEST,
    })
}

module.exports = handleHttpErrors;