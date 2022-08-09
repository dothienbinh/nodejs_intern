import jwt from 'jsonwebtoken';
import userService from '../services/userService';

export function createToken(type, user) {        
            let token = jwt.sign({
                id: user.id,
                MaNV: user.MaNV,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Role: user.Role,
            },  type == 'ACCESS_TOKEN' ? ( process.env.ACCESS_TOKEN_SECRET_KEY) : (process.env.REFRESH_TOKEN_SECRET), {
                expiresIn: type == 'ACCESS_TOKEN' ? '30s' : '60m',
            })
            return token;
       
    }

export function sendRefreshToken(res, user) {
    let token = createToken('REFRESH_TOKEN', user);
    res.cookie(
        'REFRESH_TOKEN',
        token
    )
    return token;
}



