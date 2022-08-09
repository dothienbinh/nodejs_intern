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
                outputData.errMessage = "create job successfully";
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

module.exports = {
    createJob: createJob,
}