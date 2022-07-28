import jwt from 'jsonwebtoken';
import pool from '../configs/connectDB';
import CRUDService from '../services/CRUDService'
require('dotenv').config();

let index = async (req, res) => {
    res.send('login index alo');
}

let login = async (req, res) => {
    if(!req.body.UserName || !req.body.Password) {
        
        return res.status(500).json({
            errCode: 1,
            message: 'login fail',
        })
    }
    let user = await CRUDService.loginUser(req.body);
    if(user) {
        let token = jwt.sign({
            id: user.id,
            UserName: user.UserName,
            Role: user.Role,
        },  process.env.ACCESS_TOKEN_SECRET_KEY, {
            //         // expiresIn: '3s',
        })
        res.cookie("ACCESS_TOKEN", token);
        return res.status(200).json({
            errCode: 0,
            message: 'login successfully',
            token: token,
        })
    } else {
        return res.status(500).json({
            errCode: 1,
            message: 'login fail',
        })
    }

    

    // if(data){
    //     var token = jwt.sign({
    //         _id: data._id,
    //         username: data.username,
    //         role: data.role,
    //         admin: data.admin,
    //     }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    //         // expiresIn: '3s',
    //     })
        
        
    //     console.log(token);
    //     console.log(data);

        
    //     var a = '/';
    //     // res.json(data);
    //     res.cookie("ACCESS_TOKEN", token);
    //     res.cookie("id", data.username);

    
}

let delCookie = async (req, res) => {
    

}

module.exports = {
    index, login, delCookie
}