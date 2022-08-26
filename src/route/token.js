import express, { application } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../services/userService';
import {createToken, sendRefreshToken} from '../utill/Auth'
const router = express.Router();

router.get('/refreshToken', async(req, res) => {
    const refreshToken = req.cookies.REFRESH_TOKEN;
    //check refreshToken exist
    if(!refreshToken) return res.sendStatus(401);
    try {
        const decodedUser = jwt.verify(
            refreshToken,
			process.env.REFRESH_TOKEN_SECRET
        )
        
        // check user exist
        let userExist = await userService.checkUser_id(decodedUser.id);
        userExist = userExist.user;

        if(!userExist || userExist.RefreshToken != refreshToken) {
            return res.sendStatus(401);
        }

        // Renew and save
        let token = createToken('ACCESS_TOKEN', userExist);
        let RefreshTokenV2 =  sendRefreshToken(res, userExist);
        let dataOutput = await userService.saveToken({
            id_User: userExist.id,
            token: RefreshTokenV2,
        });
        if(dataOutput.errCode !=0 ){
            return res.status(500).json({
                errCode: dataOutput.errCode,
                message: dataOutput.errMessage,
            })
        }

        res.cookie('ACCESS_TOKEN', token);
        res.json({
            ACCESS_TOKEN: token,
            RefreshTokenV2: RefreshTokenV2
        })        

    } catch (e) {
        console.log('ERROR REFRESHING TOKEN', e);
        return res.sendStatus(403);
    }
})

router.get('/logout', async(req, res) => {
    const refreshToken = req.cookies.REFRESH_TOKEN;
    const accessToken = req.cookies.ACCESS_TOKEN;
    if(!refreshToken || !accessToken) return res.sendStatus(401);
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
                return res.status(500).json({
                    errCode: dataOutput.errCode,
                    message: 'err save and remove token',
                })
            } else {
                res.clearCookie("ACCESS_TOKEN");
                res.clearCookie("REFRESH_TOKEN");
                return res.status(200).json({
                    errCode: 0,
                    message: "logout success",
                })
            }
        } else {
            return res.sendStatus(401);
        }
    } catch (e) {
        console.log('ERROR REFRESHING TOKEN', e);
        return res.sendStatus(403);
    }
})

router.get('/', (req, res) => {
    res.status(200).json("hello word");
});

module.exports = router;
