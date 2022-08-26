import db from '../models/index';
import bcrypt from 'bcryptjs';
// const { QueryTypes } = require('sequelize');
import { resolve } from 'app-root-path';
const { Op,QueryTypes } = require("sequelize");

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
                        deletedAt: null,
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
                userData.errCode = 400;
                userData.errMessage = 'UserName or Password is not correct';
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

let getInfoUser = async (id) => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {};
            let user = await db.User.findOne({
                where: {id: id},
                attributes: {
                    // include: ['FirstName', 'LastName', 'Email', 'Position', 'Phone', 'Avatar'],
                    exclude: ['UserName', 'Password', 'BHXH'],
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

let createUser = async (data) => {
    // await console.log(data.Password);
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashPassword(data.Password);
            let user = await db.User.create({
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
            let dataUser ={};
            dataUser.user = user;
            // data.errCode = 0;
            dataUser.errMessage = 'create successfully';
            resolve(dataUser);
        } catch (e) {
            
            reject(e.errors[0].message)
        }
    })
}

let getAllUser = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {};
        // let users = await db.User.findAll({
        //     where:{
        //         deletedAt: null
        //     },
        //     raw: true,
        // })
        let users = await db.sequelize.query('SELECT * FROM users',{
            raw: true,
            type: QueryTypes.SELECT
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
            let userData = {};
            let foundUser = await db.User.findOne({
                where: {
                    id: id,
                    deletedAt: null
                },
                raw: true,
            });

            if (!foundUser) {
               resolve({
                errCode:  2,
                errMessage: `the user isn't exist !`,
               }) 
            } else {
                let result = await db.User.destroy({
                    where: {
                        id: id,
                    }
                });
                resolve({
                    result: result,
                    errCode: 0,
                    errMessage: `delete user successfully!!!`,
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let destroyUser = async (id) => {
    return new Promise (async (resolve, reject) => {
        try {
            
            let result = await db.User.destroy({
                where: {
                    id: id,
                    deletedAt: {
                        [Op.ne]: null
                    }
                },
                raw: true,
                force: true,
            });
            resolve(result);
        } catch (e) {
            reject(e);
        }
    })
}

let getEditUser = async (id) => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {};
            let user = await db.User.findOne({
                where: {
                    id: id,
                    deletedAt: null,
                },
                attributes: {
                    // include: ['FirstName', 'LastName', 'Email', 'Position', 'Phone', 'Avatar'],
                    exclude: ['id', 'UserName', 'Password', 'BHXH', 'Role', 'createdAt', 'updatedAt', 'deletedAt', 'ManagerID'],
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
                userData.errMessage = 'user invalid ';
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUser_id = async (id) => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {};
            let user = await db.User.findOne({
                where: {
                    id: id,
                    deletedAt: {
                        [Op.eq]: null
                    }
                },
                raw: true,
            });
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

let updateUser = async (data) =>{
    return new Promise (async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id,
                    deletedAt: null
                },
                raw: false,
            });
            if(user) {
                user.FirstName = data.FirstName;
                user.LastName = data.LastName;
                user.Email = data.Email;
                user.Phone = data.Phone;
                user.Gender = data.Gender;
                user.CMND = data.CMND;
                user.BHXH = data.BHXH;
                user.Address = data.Address;
                
                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: "update successfully!!!",
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "user invalid",
                })
            }
        } catch (e) {
            reject(e);
        }
        
    })
}

let updateImage = async (data) => {
    return new Promise (async (resolve, reject) => {
        try {            
            let user = await db.User.findOne({
                where: {
                    id: data.id_User,
                    deletedAt: null
                },
                raw: false,
            });
            if(user) {
                user.Avatar = data.urlImage;
                
                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: "update successfully!!!",
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "user invalid",
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

// save or remove refreshToken
let saveToken = async(data) => {
    return new Promise (async (resolve, reject) => {
        try {            
            let user = await db.User.findOne({
                where: {
                    id: data.id_User,
                    deletedAt: null
                },
                raw: false,
            });
            if(user) {
                user.RefreshToken = data.token ? data.token : null;
                
                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: "save successfully!!!",
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "user invalid",
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUserExist = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {};
        let users = await db.User.findAll({ 
            where:{
                deletedAt: null,
                Role: 0,
            },
            attributes: {
                // include: ['FirstName', 'LastName', 'Email', 'Position', 'Phone', 'Avatar'],
                exclude: ['id', 'UserName', 'Password', 'BHXH', 'Role', 'createdAt', 'updatedAt', 'deletedAt', 'ManagerID', 'RefreshToken'],
            },
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

let getEmailAdmin = async () =>{
    return new Promise ( async(resolve, reject) => {
        try {
            let user = await db.User.findOne({ 
                where:{
                    deletedAt: null,
                    Role: 3,
                },
                attributes: {
                    // include: ['Email'],
                    // exclude: ['id', 'UserName', 'Password', 'BHXH', 'Role', 'createdAt', 'updatedAt', 'deletedAt', 'ManagerID', 'RefreshToken'],
                },
                raw: true,
            })
            resolve({
                email: user.Email,
                name: `${user.FirstName} ${user.LastName}`
            });
        } catch (e) {
            return res.json({
                message: "err get admin mail ",
                e,
            })
        }
    }) 
}

module.exports = {
    loginUser: loginUser,
    getInfoUser: getInfoUser,
    getAllUser: getAllUser,
    deleteUser: deleteUser,
    createUser: createUser,
    destroyUser: destroyUser,
    getEditUser: getEditUser,
    updateUser: updateUser,
    checkUser_id: checkUser_id,
    updateImage: updateImage,
    saveToken: saveToken,
    getAllUserExist: getAllUserExist,
    getEmailAdmin: getEmailAdmin
}