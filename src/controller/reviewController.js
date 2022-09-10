import HttpErrors from "../libs/error/httpErrors";
import reviewSerivce from "../services/reviewService";
import typeError from "../libs/error/typeError"
import jwt from "jsonwebtoken";

let index = async (req, res) => {
    res.json('alo');
}

// id
// Name
// Position
// Desc
// Type
// IDNv
// IDCreator

let createFormReview = async(req, res, next) => {
    // verify jwt => id user
    // id User => id create, id Nv
    // push data to service
    // get status
    // not send mail
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
    let dataInput = req.body;
    if(!dataInput.Name || !dataInput.Position || !dataInput.Desc || !dataInput.Type) {
        let err = HttpErrors.BadRequest('problem request !!!');
        err.errCode =2;
        return next(err);
    }
    dataInput.IDNv = decodedUser.id;
    dataInput.IDCreator = decodedUser.id;
    await reviewSerivce.createFormReview(dataInput)
        .then((data) => {
            res.status(200).json({
                Form: data,
            })
        })
        .catch((error) => {
            let err = HttpErrors.IODataBase(error.message);
            err.errCode = 3;
            return next(err);
        })

}

let getAllFormReview = async(req, res, next) => {
    await reviewSerivce.getAllFormReview()
            .then((data) => {
                res.status(200).json({
                    Forms: data,
                })
            })
            .catch((error) => {                
                let err = HttpErrors.IODataBase(error.message);
                err.errCode = 1;
                return next(err);
            })
}

let getAllFormReviewById = async(req, res, next) => {
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
    await reviewSerivce.getAllFormReviewByIdUser(decodedUser.id)
            .then((data) => {
                res.status(200).json({
                    Forms: data,
                })
            })
            .catch((error) => {                
                let err = HttpErrors.IODataBase(error.message);
                err.errCode = 2;
                return next(err);
            })
}

let editFormReview = async(req, res, next) => {
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
    if(!req.params.id) {
        let err = HttpErrors.BadRequest('params err');
        err.errCode = 2;
        return next(err);
    }
    let idForm = req.params.id;
    let check = await verifyFormRevew(decodedUser.id, idForm);    
    if(check) {
        await reviewSerivce.editFormReview(idForm)
                .then((data) => {
                    res.status(200).json({
                        FormReview: data,
                    })
                })
                .catch((error) => {
                    let err = HttpErrors.IODataBase(error.message);
                    err.errCode = 3;
                    return next(err);
                })
    } else {
        let err = HttpErrors.ServerError();
        err.errCode = 4;
        return next(err);
    }
}

let updateFormReview = async( req, res, next) => {
    let decodedUser={};
    let data = req.body;
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
    if(!data.Name || !data.Desc || !data.Type || !data.Position) {
        let err = HttpErrors.BadRequest('problem request !!!');
        err.errCode = 2;
        return next(err);
    }
    let idForm = req.params.id;
    let check = verifyFormRevew(decodedUser.id, idForm);
    data.IDCreator = decodedUser.id;
    data.id = req.params.id;
    if(check) {
        await reviewSerivce.updateForm(data)
                .then((dataOutput) => {
                    if(dataOutput) {
                        res.status(200).json({
                            Message: "Update Success !!!",
                        })
                    } else {
                        let err = HttpErrors.IODataBase("update fail !!!");
                        err.errCode = 3;
                        return next(err);
                    }
                })
                .catch((error) => {
                    let err = HttpErrors.IODataBase(error.message);
                    err.errCode = 4;
                    return next(err);
                })
    } else {
        let err = HttpErrors.ServerError();
        err.errCode = 5;
        return next(err);
    }
}

let deleteFormReview = async (req, res, next) => {
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
    let idForm = req.params.id;
    let check = verifyFormRevew(decodedUser.id, idForm);
    if(check) {
        await reviewSerivce.deleteForm(idForm)
                .then((data) => {
                    if(data) {
                        res.status(200).json({
                            Message: "Delete Success !!!",
                        })
                    } else {
                        let err = HttpErrors.IODataBase("delete fail !!!");
                        err.errCode = 2;
                        return next(err);
                    }
                })
                .catch((error) => {
                    let err = HttpErrors.IODataBase(error.message);
                    err.errCode = 3;
                    return next(err);
                })
    } else {
        let err = HttpErrors.ServerError();
        err.errCode = 4;
        return next(err);
    }
}

let verifyFormRevew = async function (idUser, idForm) {
    let data = {};
    await reviewSerivce.getIdForm(idUser)
        .then((idReviews) => {
            data = idReviews;
        })
        .catch((err) => {
            let error = HttpErrors.IODataBase(err.message);
            error.errCode = 10;
            return next(error);
        })
    let a = data.find(item => item.id == idForm);
    
    if(a) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    index, createFormReview, getAllFormReview, editFormReview, updateFormReview, deleteFormReview, getAllFormReviewById
}