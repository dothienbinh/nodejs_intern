function statusError(statusCode)  {
    switch (statusCode) {
        case 400: 
            return 'Bad Request';
        case 401: 
            return 'Unauthorized';
        case 403: 
            return 'Forbidden';
        case 404: 
            return 'Not Found';
        case 409: 
            return 'Conflict';
        case 500: 
            return 'Internal Server Error';
    }
}
 
export {statusError};