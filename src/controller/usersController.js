require('dotenv').config();
import multer from 'multer';
import userService from '../services/userService';
import jwt from 'jsonwebtoken';
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

let loginUser = async (req, res) => {

    if(!req.body.UserName || !req.body.Password) {
        
        return res.status(500).json({
            errCode: 1,
            message: 'login fail',
        })
    }
    let userData = await userService.loginUser(req.body.UserName, req.body.Password);
    
    if(userData.user) {
        let userSuccess = userData.user;
        let token = jwt.sign({
            id: userSuccess.id,
            UserName: userSuccess.UserName,
            Role: userSuccess.Role,
        },  process.env.ACCESS_TOKEN_SECRET_KEY, {
            // expiresIn: '3s',
        })
        res.cookie("ACCESS_TOKEN", token);
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            token: token,
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
    
}

let deleteUser = async (req, res) => {
    console.log(req.body.id);
    let mess = await userService.deleteUser(req.body.id);
    return res.status(200).json({
        message: mess,
    })
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

module.exports = {
    index, upAvatar, handleUploadFile, createUser, deleteUser, getInfoUser, loginUser, getAllUser
}