import db from '../models/index';
import bcrypt from 'bcryptjs';
import { resolve } from 'app-root-path';
const { Op } = require("sequelize");

let createJob = (data) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let job = await db.Job.create({
                Name: data.Name,
                Desc: data.Desc,
                Status: data.Status == '1' ? true : false,
                StatusDesc: data.StatusDesc,
                IDNv: data.IDNv,
                IDCreator: data.IDCreator,                
            });
            let outputData = {};
            if(job){
                outputData.job = job;
                outputData.errCode = 0;
                outputData.Message = "create job successfully";
            } else {
                outputData.errCode = 1;
                outputData.errMessage = "create job fail";
            }            
            resolve(outputData);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllFormJob = () =>{
    return new Promise( async (resolve, reject) => {
        try {
            let jobs = await db.Job.findAll({
                raw: true,
            })
            resolve(jobs);
        } catch (error) {
            reject(error);
        }
    })
}

let getAllFormJobByIdUser = (id) =>{
    return new Promise( async (resolve, reject) => {
        try {
            let jobs = await db.Job.findAll({
                where: {
                    IDCreator: id,
                },
                raw: true,
            })
            resolve(jobs);
        } catch (error) {
            reject(error);
        }
    })
}

let editFormJob = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            let job = await db.Job.findOne({
                where: {
                    id: id,
                },
                raw: true,
            })            
            resolve(job);
        } catch (error) {
            reject(error);
        }
    })
}

let getIdForm = (IDNv) => {
    return new Promise (async (resolve, reject) => {
        try {
            let idJobs = await db.Job.findAll({
                where: {
                    IDNv: IDNv,
                },
                raw: true,
                attributes: {
                    // include: ['id'],
                    exclude: ['Name', 'Desc', 'Status', 'StatusDesc', 'IDNv', 'IDCreator', 'createdAt', 'updatedAt', 'deletedAt'],
                }
            })
            resolve(idJobs);
        } catch (error) {
            reject(error)
        }
    })
}

let updateFormJob = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            let update = await db.Job.findOne({
                Where: {
                    id: data.id,
                }
            })
            update.Name = data.Name;
            update.Desc = data.Desc;
            update.Status = data.Status;
            update.StatusDesc = data.StatusDesc;
            let check = await update.save();
            resolve(check);
        } catch (error) {
            reject(error);
        }
    })
}

let deleteFormJob = (idJob) => {
    return new Promise (async (resolve, reject) => {
        try {
            let tmp = await db.Job.destroy({
                where: {
                    id: idJob,
                },
                raw: true,
                force: true,
            });
            resolve(tmp);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createJob: createJob,
    getAllFormJob: getAllFormJob,
    getIdForm: getIdForm,
    editFormJob: editFormJob,
    updateFormJob: updateFormJob,
    deleteFormJob: deleteFormJob,
    getAllFormJobByIdUser: getAllFormJobByIdUser,
}