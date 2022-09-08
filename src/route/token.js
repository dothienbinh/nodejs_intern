import express, { application } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../services/userService';
import {createToken, sendRefreshToken} from '../utill/Auth'
import HttpErrors from '../libs/error/httpErrors';
const router = express.Router();

router.get('/refreshToken', async(req, res, next) => {
    const refreshToken = req.cookies.REFRESH_TOKEN;
    //check refreshToken exist
    if(!refreshToken) {
        let err = HttpErrors.Unauthorized('refreshToken is not exist');
        err.errCode = 1;
        return next(err);
    }
    try {
        const decodedUser = jwt.verify(
            refreshToken,
			process.env.REFRESH_TOKEN_SECRET
        )
        
        // check user exist
        let userExist = await userService.checkUser_id(decodedUser.id);
        userExist = userExist.user;

        if(!userExist || userExist.RefreshToken != refreshToken) {
            let err = HttpErrors.Forbiden();
            err.errCode = 2;
            return next(err);
        }

        // Renew and save
        let token = createToken('ACCESS_TOKEN', userExist);
        let RefreshTokenV2 =  sendRefreshToken(res, userExist);
        let dataOutput = await userService.saveToken({
            id_User: userExist.id,
            token: RefreshTokenV2,
        });
        if(dataOutput.errCode !=0 ){
            let err = HttpErrors.ServerError(dataOutput.errMessage);
            err.errCode = dataOutput.errCode;
            return next(err);            
        }

        res.cookie('ACCESS_TOKEN', token);
        res.status(200).json({
            ACCESS_TOKEN: token,
            RefreshTokenV2: RefreshTokenV2
        })        

    } catch (e) {
        let err = HttpErrors.Forbiden(e.message);
        err.errCode = 3;
        return next(err);
    }
})

router.get('/logout', async(req, res, next) => {
    const refreshToken = req.cookies.REFRESH_TOKEN;
    const accessToken = req.cookies.ACCESS_TOKEN;
    if(!refreshToken || !accessToken) {
        let err = HttpErrors.Unauthorized('refreshToken accessToken is not exist');
        err.errCode = 1;
        return next(err);
    }
    try {
        let decodeAccessToken = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET_KEY
        )
        let decodeRefreshToken = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        if(decodeAccessToken.id == decodeRefreshToken.id) {
            let dataOutput = await userService.saveToken({
                id_User: decodeAccessToken.id,
            });
            if(dataOutput.errCode !=0 ){
                let err = HttpErrors.IODataBase('err save and remove token');
                err.errCode = dataOutput.errCode;
                return next(err);
            } else {
                res.clearCookie("ACCESS_TOKEN");
                res.clearCookie("REFRESH_TOKEN");
                return res.status(200).json({
                    errCode: 0,
                    message: "logout success",
                })
            }
        } else {
            let err = HttpErrors.Forbiden();
            err.errCode = 3;
            return next(err);
        }
    } catch (e) {
        let err = HttpErrors.ServerError(e.message);
        err.errCode = 4;
        return next(err);
    }
})

router.get('/', (req, res) => {
    res.status(200).json("hello word");
});

module.exports = router;
