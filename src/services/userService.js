import db from '../models/index';
import bcrypt from 'bcryptjs';
import { resolve } from 'app-root-path';

const salt = bcrypt.genSaltSync(10);

let loginUser = async (UserName, Password) => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {};

            // check user by UserName
            let isExist = await checkUserName(UserName);
            if(isExist) {
                let user = await db.User.findOne({
                    where: {
                        UserName: UserName,
                    },
                    raw: true,
                })

                // check user exist 
                if(user) {
                    // check password
                    let comparePassword = await bcrypt.compareSync(Password, user.Password);
                    if(comparePassword) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK'
                        userData.user = user;
                    } else {
                        // password wrong
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                    }
                } else {
                    // UserName err
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = 'UserName Err';
            }
            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserName = async (UserName) =>{
    return new Promise (async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    UserName: UserName,
                },
                raw: true,
            })

            if(user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getInfoUser = async (id) => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {};
            let user = await db.User.findOne({
                where: {id: id},
                attributes: {
                    // include: ['FirstName', 'LastName', 'Email', 'Position', 'Phone', 'Avatar'],
                    exclude: ['id', 'UserName', 'Password', 'BHXH'],
                },
                raw: true,
            });
            // user exist ?
            if(user){
                userData.errCode = 0;
                userData.errMessage = 'Ok';
                userData.user = user;
            } else {
                userData.errCode = 1;
                userData.errMessage = 'user not found';
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {};
        let users = await db.User.findAll({
            raw: true,
        })
        if(users) {
            userData.errCode = 0;
            userData.errMessage = 'Ok';
            userData.users = users;
        } else {
            userData.errCode = 1;
            userData.errMessage = 'no user in the system';
        }
        resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

let deleteUser = async (id) => {
    return new Promise (async (resolve, reject) => {
        try {
            await db.User.destroy({
                where: {
                    id: id,
                }
            });
            let mess = 'ok';
            resolve(mess);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    loginUser: loginUser,
    getInfoUser: getInfoUser,
    getAllUser: getAllUser,
    deleteUser: deleteUser,
}