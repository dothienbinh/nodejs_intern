import jwt from 'jsonwebtoken';

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
                res.sendStatus(401);
            } else {
                let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
                decoded.Role === 3 ? next() : res.sendStatus(403);
            }
        } catch (e) {
            console.log('ERROR REFRESHING TOKEN', e);
            return res.sendStatus(403);
        }
    }

    checkRole(Role) {
        return (req, res, next) =>{
            try {
                let token = req.cookies.ACCESS_TOKEN;
                if(!token) {
                    res.sendStatus(401);
                } else {
                    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
                    decoded.Role >= Role ? next() : res.sendStatus(403);
                }
            } catch (e) {
                console.log('ERROR REFRESHING TOKEN', e);
                return res.sendStatus(403);
            }
        }
    }

    verifyUser(id) {
        return (req, res, next) => {
            try {
                let token = req.cookies.ACCESS_TOKEN;
                if(!token) {
                    res.sendStatus(401);
                } else {
                    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
                    decoded.id == id ? next() : res.sendStatus(401);
                }
            } catch (e) {
                console.log('ERROR REFRESHING TOKEN', e);
                return res.sendStatus(403);
            }
        }
    }
}

module.exports = new Auth;