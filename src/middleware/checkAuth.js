import jwt from 'jsonwebtoken';
import HttpErrors from '../libs/error/httpErrors';
import typeError from '../libs/error/typeError';
/* 
Role :
    0: user - employee (update info)
    1: Manager (read for all staff)
    2: HR , Drirector (create form for all user)
    3: Admin (create user, create)

*/


class Auth {
    checkAdmin(req, res, next) {
        try {
            let token = req.cookies.ACCESS_TOKEN;
            if(!req.cookies.ACCESS_TOKEN) {
                let err = HttpErrors.Unauthorized('Access token invalid', typeError.TOKEN_ERROR);
                err.errCode = 10;
                return next(err);
            } else {
                let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
                if(decoded.Role === 3) {
                    next();
                } else {
                    let err = HttpErrors.Forbiden('Unauthorized', typeError.TOKEN_ERROR);
                    err.errCode = 11;
                    return next(err);
                }
            }
        } catch (e) {
            let err = HttpErrors.InvalidToken(e.message);
            err.errCode = 12;
            return next(err);
        }
    }

    checkRole(Role) {
        return (req, res, next) =>{
            try {
                let token = req.cookies.ACCESS_TOKEN;
                if(!token) {
                    let err = HttpErrors.Unauthorized('Token invalid', typeError.TOKEN_ERROR);
                    err.errCode = 13;
                    return next(err);
                    
                } else {
                    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
                    if(decoded.Role >= Role) {
                        next();
                    } else {
                        let err = HttpErrors.Forbiden();
                        err.errCode = 14;
                        return next(err);
                    }
                }
            } catch (e) {
                let err = HttpErrors.InvalidToken(e.message);
                err.errCode = 15;
                return next(err);
            }
        }
    }

    verifyUser(id, token) {
        if(!id) {
            let err = HttpErrors.BadRequest('id user invalid');
            err.errCode = 5;
            return err;
        }
        if(!token) {
            let err = HttpErrors.InvalidToken('token invalid');
            err.errCode = 6;
            return err;
        }
        let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        if(decoded.id == id) {
            return true;
        } else {
            let err= HttpErrors.Forbiden();
            err.errCode = 7;
            return err;
        }        
    }
}

module.exports = new Auth;