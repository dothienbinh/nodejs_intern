require('dotenv').config();
import multer from 'multer';
import userService from '../services/userService';
import jwt from 'jsonwebtoken';
import {createToken, sendRefreshToken} from '../utill/Auth'
import checkAuth from '../middleware/checkAuth';
const port = process.env.PORT || 8080;
let upload = multer().single('profile_pic');

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`http://localhost:${port}/${req.file.filename}`);
    });
}

let loginUser = async (req, res, next) => {

    if(!req.body.UserName || !req.body.Password) {
        
        const err = new Error('UserName or Password is not correct');
        err.statusCode = 400;
        return next(err);
    }

    if(req.cookies.ACCESS_TOKEN) {
        const err = new Error('session login exist');
        err.statusCode = 400;
        return next(err);
    }

    let userData = await userService.loginUser(req.body.UserName, req.body.Password);
    
    if(userData.user) {

        //create token refreshToken
        let userSuccess = userData.user;
        let token = createToken('ACCESS_TOKEN', userSuccess);
        res.cookie("ACCESS_TOKEN", token);
        let refreshToken = sendRefreshToken(res, userSuccess);
        // save REFRESH_TOKEN db
        let dataOutput = await userService.saveToken({
            id_User: userSuccess.id,
            token: refreshToken,
        })
        if(dataOutput.errCode != 0) {
            return res.status(200).json({
                errCode: dataOutput.errCode,
                message: dataOutput.errMessage,
                
            })
        }
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            ACCESS_TOKEN: token,
            REFRESH_TOKEN: refreshToken,
        })
    } else {
        return res.status(500).json({
            errCode: userData.errCode,
            message: userData.errMessage,
        })
    }
}

let upAvatar = async (req, res)=>{

}

let index = async (req, res) => {
    return res.send('alo alo');
}


let createUser = async (req, res) => {
    userService.createUser(req.body).then((data) => {
        res.status(200).json({
            data
        });
    }).catch(err => {
        res.status(500).json({
            errCode: 3,
            errMessage: err,
        })
    })
    
}

let deleteUser = async (req, res) => {
    console.log(req.body.id);
    let userData = await userService.deleteUser(req.body.id);
    if(!userData.result) {
        return res.status(500).json({
            errCode: userData.errCode,
            message: userData.errMessage,
        })
    } else {
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
        })
    }
}

let getInfoUser = async (req, res) => {
    if(!req.query.id) {
        return res.status(500).json({
            errCode: 1,
            message: 'user not found',
        })
    } else {
        let userData = await userService.getInfoUser(req.query.id);
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {},
        })
    }
    
}

let getAllUser = async (req, res) => {
    let userData = await userService.getAllUser();
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        users: userData.users ? userData.users : {},
    })
}

let destroyUser = async (req, res) => {
    let mess = await userService.destroyUser(req.body.id);
    return res.status(200).json({
        message: mess,
    })
}

let editUser = async (req, res) => {
    if(!req.params.id) {
        return res.status(500).json({
            errCode: 1,
            message: 'user not found',
        })
    } else {
        checkAuth.verifyUser(req.params.id);

        let userData = await userService.getEditUser(req.params.id);
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {},
        })
    }
    
}

let restoreUser = async (req, res) => {

}

let updateUser = async (req, res) => {
    let id = req.params.id;
    // verify -> id - compare id_token vs id
    checkAuth.verifyUser(req.params.id);
    //
    let userData = await userService.checkUser_id(id);
    if(!userData.user) {
        return res.status(500).json({
            errCode: userData.errCode,
            message: userData.errMessage,
        })
    } else {
        let userId = userData.user.id;
        let data = {};
        data = req.body;
        data.id = userId;
        if(id == userId) {
            let result = await userService.updateUser(data);
            res.json(result);
        } else {
            return res.status(500).json({
                errCode: 4,
                message: 'Not Permisson!'
            })
        }
    }
}

let updateImage = async (req, res) => {
    let id = req.params.id;
    let id_User = id;
    let urlImage = '';
    let dataInput ={};
    dataInput.id_User = id_User;
    // verify -> id - compare id_token vs id
    checkAuth.verifyUser(id_User);
    //update
    let userData = await userService.checkUser_id(id);
    if(!userData.user) {
        return res.status(500).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage,
        })
    } else {
        upload(req, res,  async (err) => {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
    
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
    
            // Display uploaded image for user validation
            urlImage = `http://localhost:${port}/${req.file.filename}`;
            dataInput.urlImage= urlImage;
            let dataOutput = await userService.updateImage(dataInput);                        
            return res.status(200).json({
                errCode: dataOutput.errCode,
                errMessage: dataOutput.errMessage,
            })
        });
    }
}

let getAllUserExist = async (req, res) => {
    let userData = await userService.getAllUserExist();
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        users: userData.users ? userData.users : {},
    })
} 

module.exports = {
    index, upAvatar, handleUploadFile, createUser, deleteUser, getInfoUser, loginUser, getAllUser, destroyUser, editUser,
    restoreUser, updateUser, updateImage, getAllUserExist
}