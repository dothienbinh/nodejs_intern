import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    console.log(data);
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashPassword(data.Password);
            await db.User.create({
                MaNV: data.MaNV,
                FirstName: data.FirstName,
                LastName: data.LastName,
                Email: data.Email,
                UserName: data.UserName,
                Password: hashPasswordFromBcrypt,
                Phone: data.Phone,
                Gender: data.Gender == '1' ? true : false,
                CMND: data.CMND,
                BHXH: data.BHXH,
                Address: data.Address,
                ManagerID: data.ManagerID ? data.ManagerID : null,
                Role: data.Role,
            })
            resolve('ok create a new user successfuly')
        } catch (e) {
            reject(e)
        }
    })
    
}

let loginUser = async (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    UserName: data.UserName,
                },
                raw: true
            });
            if( await checkPassword(data.Password, user.Password)) {
                resolve(user);
            } else {
                resolve();
            }
        } catch (e) {
            reject(e)
        }
    })
}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let checkPassword = (password, hashPass) => {
    return new Promise (async (resolve, reject) => {
        try {
            let comparePassword = await bcrypt.compareSync(password, hashPass);
            resolve(comparePassword);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    loginUser: loginUser,
}