import db from '../models/index';
const { Op } = require("sequelize");

let createFormReview = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let form = await db.Review.create({
                Name: data.Name,
                Position: data.Position,
                Desc: data.Desc,
                Type: data.Type,
                IDNv: data.IDNv,
                IDCreator: data.IDCreator
            });
            resolve(form);
        } catch (error) {
            reject(error);
        }
    })
}

let getAllFormReview = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let Forms = await db.Review.findAll({
                raw: true,
            });
            resolve(Forms);
        } catch (error) {
            reject(error);
        }
    })
}

let getAllFormReviewByIdUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Forms = await db.Review.findAll({
                where: {
                    IDCreator: id,
                },
                raw: true,
            });
            resolve(Forms);
        } catch (error) {
            reject(error);
        }
    })
}

let editFormReview = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Form = await db.Review.findOne({
                where: {
                    id: id,
                },
                raw: true,
            })
            resolve(Form);
        } catch (error) {
            reject(error);
        }
    })
}

let getIdForm = (idUser) => {
    return new Promise( async(resolve, reject) => {
        try {
            let idReviews = await db.Review.findAll({
                where: {
                    IDcreator: idUser,
                },
                raw: true,
                attributes: {
                    // include: ['id'],
                    exclude: ['Name', 'Desc', 'Position', 'Type', 'IDNv', 'IDCreator', 'createdAt', 'updatedAt', 'deletedAt'],
                }
            })
            resolve(idReviews);
        } catch (error) {
            reject(error);
        }
    })
}

let updateForm = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            let FormUpdate = await db.Review.findOne({
                where: {
                    id: data.id,
                },
            })
            FormUpdate.Name = data.Name;
            FormUpdate.Desc = data.Desc;
            FormUpdate.Position = data.Position;
            FormUpdate.Type = data.Type;
            let check = await FormUpdate.save();
            resolve(check);
        } catch (error) {
            reject(error);
        }
    })
}

let deleteForm = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tmp = await db.Review.destroy({
                where: {
                    id: id,
                },
                raw: true,
                force: true,
            })
            resolve(tmp);
        } catch (error) {
            reject(error);
            
        }
    })
}

module.exports = {
    createFormReview: createFormReview,
    getAllFormReview: getAllFormReview,
    getIdForm: getIdForm,
    editFormReview: editFormReview,
    updateForm: updateForm,
    deleteForm: deleteForm,
    getAllFormReviewByIdUser: getAllFormReviewByIdUser,
}