import jobService from "../services/jobService";
import checkAuth from '../middleware/checkAuth';
import emailService from '../services/emailService';
import userService from '../services/userService';
import jwt, { verify } from "jsonwebtoken";
import HttpErrors from '../libs/error/httpErrors';
import typeError from '../libs/error/typeError';


let index = (req, res, next) => {
    let err = HttpErrors.BadRequest();
    return next(err);
}

let createJob = async (req, res) =>{
    // check who?
    //idCreator = iduser
    // not admin => idnv = iduser
    // admin => id nv = all id user

    // check who?
    let decodedUser={};
    try {
        decodedUser = jwt.verify(
            req.cookies.ACCESS_TOKEN,
            process.env.ACCESS_TOKEN_SECRET_KEY
        )
    } catch (e) {
        res.json({
            message: "err sverify jwt ",
            e,
        })
    }
    let dataInput = {};

    // user not admin
    if(decodedUser.Role != 3) {
        dataInput.Name = req.body.Name;
        dataInput.Desc = req.body.Desc;
        dataInput.Status = req.body.Status ? true : false;
        dataInput.StatusDesc = req.body.StatusDesc;
        dataInput.IDNv = decodedUser.id
        dataInput.IDCreator = decodedUser.id
        // get email admin
        let userData = await userService.getEmailAdmin();
        dataInput.UserName = userData.name;
        dataInput.listMail = userData.email;
        console.log('check>>>', dataInput);
        // send mail from user to email admin
        let dataOutput = await createJobEmployee(dataInput);
        res.status(200).json({
            message: "sussecc!"
        })
    }
    
}

async function createJobEmployee(data){
    // create db
    let dataOutput = await jobService.createJob(data);
    if(!dataOutput.job) {
        res.status(500).json({
            errCode: dataOutput.errCode,
            message: dataOutput.errMessage,
        })
    }
    // send mail
    await emailService.sendEmail(data);
    
}

let createFromJob = async (req, res, next) => {

    // verify jwt => id user
    // id user => id creator, id Nv
    // push data to service db
    // get success
    // Not send mail

    let decodedUser={};
    try {
        decodedUser = await jwt.verify(
            req.cookies.ACCESS_TOKEN,
            process.env.ACCESS_TOKEN_SECRET_KEY
        )
    } catch (e) {
        let err = HttpErrors.InvalidToken('err verify jwt', typeError.TOKEN_ERROR);
        err.errCode = 1;
        return next(err);        
    }
    let dataInput = {};
    let data = req.body;
    if(!data.Name || !data.Desc || !data.StatusDesc) {
        let err = HttpErrors.BadRequest('problem request !!!');
        err.errCode =2;
        return next(err);
    }
    dataInput.Name = req.body.Name;
    dataInput.Desc = req.body.Desc;
    dataInput.Status = req.body.Status ? true : false;
    dataInput.StatusDesc = req.body.StatusDesc;
    dataInput.IDNv = decodedUser.id
    dataInput.IDCreator = decodedUser.id

    let dataOutput= await jobService.createJob(dataInput);
    if(dataOutput.errCode == 0) {
        res.status(200).json(dataOutput);
    } else {
        let err = new HttpErrors.IODataBase(dataOutput.errMessage);
        err.errCode = 3;
        return next(err);
    }
    
}

let getAllFormJob = async ( req, res, next) => {
    jobService.getAllFormJob()
       .then((data) =>{
            res.status(200).json(data);
       })
       .catch((err) => {
            let error = HttpErrors.IODataBase(err.message);
            error.errCode = 1;
            next(error);
       })
}

let getAllFormJobByIdUser = async ( req, res, next) => {
    let decodedUser={};
    try {
        decodedUser = await jwt.verify(
            req.cookies.ACCESS_TOKEN,
            process.env.ACCESS_TOKEN_SECRET_KEY
        )
    } catch (e) {
        let err = HttpErrors.InvalidToken('err verify jwt', typeError.TOKEN_ERROR);
        err.errCode = 1;
        return next(err);        
    }
    jobService.getAllFormJobByIdUser(decodedUser.id)
       .then((data) =>{
            res.status(200).json(data);
       })
       .catch((err) => {
            let error = HttpErrors.IODataBase(err.message);
            error.errCode = 2;
            next(error);
       })
}

let editFormJob = async(req, res, next) => {
    // verify token => user
    // id user => all formJob
    // => get form by id in all form job
    let decodedUser ={};
    try {
        decodedUser = await jwt.verify(
            req.cookies.ACCESS_TOKEN,
            process.env.ACCESS_TOKEN_SECRET_KEY
        )
    } catch (e) {
        let err = HttpErrors.InvalidToken('err verify jwt', typeError.TOKEN_ERROR);
        err.errCode = 1;
        return next(err);        
    }
    let check = await verifyFormJob(decodedUser.id, req.params.id);
    if(check) {
        await jobService.editFormJob(req.params.id)
            .then((dataOutput) => {
                res.status(200).json({
                    job: dataOutput
                });
            })
            .catch((err) => {
                let error = HttpErrors.IODataBase(err.message);
                error.errCode = 2;
                return next(error);
            })
    } else {
        let error = HttpErrors.IODataBase('formjob not found !!!');
        error.errCode = 3;
        return next(error);
    }
}

let updateformJob = async(req, res, next) => {
    let decodedUser ={};
    let data = {};
    try {
        decodedUser = await jwt.verify(
            req.cookies.ACCESS_TOKEN,
            process.env.ACCESS_TOKEN_SECRET_KEY
        )
    } catch (e) {
        let err = HttpErrors.InvalidToken('err verify jwt', typeError.TOKEN_ERROR);
        err.errCode = 1;
        return next(err);        
    }
    if(!req.params.id || !req.body.Name || !req.body.Desc || !req.body.StatusDesc) {
        let err = HttpErrors.BadRequest('problem request !!!');
        err.errCode = 2;
        return next(err);
    }
    if(req.body.Status !=0 && req.body.Status != 1) {
        let err = HttpErrors.BadRequest('problem request !!!');
        err.errCode = 3;
        return next(err);
    }
    let check = await verifyFormJob(decodedUser.id, req.params.id);
    if(check) {
        data.id = req.params.id;
        data.Name = req.body.Name;
        data.Desc = req.body.Desc;
        data.StatusDesc = req.body.StatusDesc;
        data.Status = req.body.Status;
        await jobService.updateFormJob(data)
            .then((dataOutput) => {
                if(dataOutput) {
                    res.status(200).json({
                        Messagee: "Save success!!!",
                    })
                } else {
                    let err = HttpErrors.IODataBase('update fail !!!');
                    err.errCode = 4;
                    return next(err);
                }
            })
    } else {
        let error = HttpErrors.IODataBase('formjob not found !!!');
        error.errCode = 5;
        return next(error);
    }
}

let deleteFormJob = async(req, res, next) => {
    // verifyFormJob
    // deleteFormJob
    let decodedUser ={};
    let data = {};
    try {
        decodedUser = await jwt.verify(
            req.cookies.ACCESS_TOKEN,
            process.env.ACCESS_TOKEN_SECRET_KEY
        )
    } catch (e) {
        let err = HttpErrors.InvalidToken('err verify jwt', typeError.TOKEN_ERROR);
        err.errCode = 1;
        return next(err);        
    }
    let check = await verifyFormJob(decodedUser.id, req.params.id);
    if(check) {
        let tmp = await jobService.deleteFormJob(req.params.id);
        if(tmp) {
            res.status(200).json({
                Message: "Delete Success !!!"
            });
        } else {
            let err = HttpErrors.IODataBase('Delete fail !!!');
            err.errCode = 2;
        }
    } else {
        let error = HttpErrors.IODataBase('formjob not found !!!');
        error.errCode = 3;
        return next(error);
    }
}

let verifyFormJob = async function (idUser, idJob) {
    let data = {};
    await jobService.getIdForm(idUser)
        .then((idJobs) => {
            data = idJobs;
        })
        .catch((err) => {
            let error = HttpErrors.IODataBase(err.message);
            error.errCode = 10;
            return next(error);
        })
    let a = data.find(item => item.id == idJob);
    
    if(a) {
        return true;
    } else {
        return false;
    }
}


module.exports = {
    index, createJob, createFromJob, getAllFormJob, editFormJob, updateformJob, deleteFormJob, getAllFormJobByIdUser
}