require('dotenv').config();
import multer from 'multer';
import userService from '../services/userService';
import jwt from 'jsonwebtoken';
import {createToken, sendRefreshToken} from '../utill/Auth'
import checkAuth from '../middleware/checkAuth';
import HttpErrors from '../libs/error/httpErrors';
import typeError from '../libs/error/typeError';
const port = process.env.PORT || 8080;
let upload = multer().single('profile_pic');

let handleUploadFile = async (req, res, next) => {
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
        
        let err = HttpErrors.BadRequest('UserName or Password is not correct');
        return next(err);
    }

    if(req.cookies.ACCESS_TOKEN) {
        let err = HttpErrors.BadRequest('session login exist', typeError.TOKEN_ERROR);
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
        
        let data = {
            ACCESS_TOKEN: token,
            REFRESH_TOKEN: refreshToken,
        }

        return res.status(200).json({data});
    } else {

        let err = HttpErrors.BadRequest(userData.errMessage);
        err.errCode = userData.errCode;        

        return next(err);
    }
}

let upAvatar = async (req, res)=>{

}

let index = async (req, res) => {
    return res.send('alo alo');
}


let createUser = async (req, res, next) => {
    let dataInput = req.body;
    if(!dataInput.MaNV || !dataInput.FirstName || !dataInput.LastName || !dataInput.Email || !dataInput.UserName || !dataInput.Password || !dataInput.Position){
        let err = HttpErrors.BadRequest("request fail !!!");
        return next(err);
    }
    if(!verifyRole(dataInput)) {
        let err = HttpErrors.BadRequest("request fail Role!!!");
        return next(err);
    }
    userService.createUser(req.body).then((data) => {
       
        return res.status(200).json({data});
    }).catch(error => {
        return next(error);
    })
    
}


let deleteUser = async (req, res, next) => {
    if(!req.body.id) {
        let err = HttpErrors.BadRequest('id user is not exist !');
        return next(err);
    }
    let userData = await userService.deleteUser(req.body.id);
    if(!userData.result) {
        let err = HttpErrors.IODataBase(userData.errMessage);
        err.errCode = userData.errCode
        return next(err)
    } else {
        return res.status(200).json({
            Code: userData.errCode,
            message: userData.errMessage,
        })
    }
}

let getInfoUser = async (req, res, next) => {
    if(!req.query.id) {
        let err = HttpErrors.BadRequest("request fail !!!");
        return next(err);
    } else {
        let userData = await userService.getInfoUser(req.query.id);
        if(userData.user) {
            return res.status(200).json({
                Code: userData.errCode,
                message: userData.errMessage,
                user: userData.user,
            });
        } else {
            let err = HttpErrors.IODataBase(userData.message);
            return next(err);
        }
        
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

let destroyUser = async (req, res, next) => {
    if(!req.body.id) {
        let err = HttpErrors.BadRequest("request fail !!!");
        return next(err);
    }
    let mess = await userService.destroyUser(req.body.id);
    if(mess) {
        res.status(200).json({
            message: 'Destroy user successfully',
        })
    } else {
        let err = HttpErrors.IODataBase('destroy fail !!!');
        return next(err);
    }
}

let editUser = async (req, res, next) => {
    if(!req.params.id) {
        let err = HttpErrors.BadRequest("request fail !!!");
        return next(err);
    } else {
        checkAuth.verifyUser(req.params.id);

        let userData = await userService.getEditUser(req.params.id);
        return res.status(200).json({
            Code: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {},
        })
    }
    
}

let restoreUser = async (req, res) => {

}

let updateUser = async (req, res, next) => {
    let id = req.params.id;
    console.log(req.body);
    // verify -> id - compare id_token vs id
    checkAuth.verifyUser(req.params.id);
    //
    let data = req.body;
    if(!data.FirstName || !data.LastName || !data.Email || !data.UserName || !data.Password || !data.Phone || !data.Gender || !data.CMND || !data.BHXH || !data.Address) {
        let err = HttpErrors.BadRequest("problem request !!!");
        return next(err);
    }
    let userData = await userService.checkUser_id(id);
    if(!userData.user) {
        let err = HttpErrors.IODataBase(userData.errMessage);
        return next(err);
    } else {
        let userId = userData.user.id;
        let dataInput = {};
        dataInput = req.body;
        dataInput.id = userId;
        if(id == userId) {
            let result = await userService.updateUser(dataInput);
            res.status(200).json(result);
        }
    }
}

let updateImage = async (req, res, next) => {
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
        let err = HttpErrors.IODataBase(userData.errMessage);
        err.errCode = userData.errCode;
        return next(err);        
    } else {
        upload(req, res,  async (err) => {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
    
            if (req.fileValidationError) {
                console.log(req.fileValidationError);
                let error = HttpErrors.UploadError('req.fileValidationError');
                error.errCode = 1;
                return next(error);
            }
            else if (!req.file) {
                let error = HttpErrors.UploadError('Please select an image to upload');
                error.errCode = 2;
                return next(error);
            }
            else if (err instanceof multer.MulterError) {
                let error = HttpErrors.UploadError(err.message);
                error.errCode = 3;
                return next(error);
            }
            else if (err) {
                let error = HttpErrors.UploadError(err.message);
                error.errCode = 4;
                return next(error);
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

let verifyRole = function (data) {
    if(data.Role >= 0 && data.Role <=3) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    index, upAvatar, handleUploadFile, createUser, deleteUser, getInfoUser, loginUser, getAllUser, destroyUser, editUser,
    restoreUser, updateUser, updateImage, getAllUserExist
}