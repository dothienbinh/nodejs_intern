import jobService from "../services/jobService";
import checkAuth from '../middleware/checkAuth';
import emailService from '../services/emailService';
import userService from '../services/userService';
import jwt from "jsonwebtoken";


let index = (req, res) => {
    res.json('alo alo');
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
        return res.json({
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
        return res.status(500).json({
            message: "sussecc!"
        })
    }
    
}

async function createJobEmployee(data){
    // create db
    let dataOutput = await jobService.createJob(data);
    if(!dataOutput.job) {
        return res.status(500).json({
            errCode: dataOutput.errCode,
            message: dataOutput.errMessage,
        })
    }
    // send mail
    await emailService.sendEmail(data);
    
}

module.exports = {
    index, createJob
}