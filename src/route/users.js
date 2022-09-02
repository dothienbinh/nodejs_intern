import express from 'express';
import usersController from '../controller/usersController';
import multer from 'multer';
import path from 'path';
import checkAuth from '../middleware/checkAuth';
var appRoot = require('app-root-path');
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        let err = new Error('Only image files are allowed!');
        err.typeError = 'Upload Error';
        return cb(err, false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });


router.post('/login', usersController.loginUser);
//admin
router.post('/createUser', checkAuth.checkRole(3), usersController.createUser);
// HR Drirector Admin
router.delete('/deleteUser', checkAuth.checkRole(2), usersController.deleteUser);
//admin
router.delete('/destroyUser', checkAuth.checkRole(3), usersController.destroyUser);
//admin
router.get('/userInfo', checkAuth.checkRole(3), usersController.getInfoUser);
// update not image - not admin - verifyUser
router.get('/:id/edit', checkAuth.checkRole(0), usersController.editUser);
// update not image - not admin - verifyUser
router.put('/:id/updateUser', checkAuth.checkRole(0), usersController.updateUser);
// update image - verifyUser
router.put('/:id/updateImage', checkAuth.checkRole(0), upload.single('avatar'), usersController.updateImage)
// get all user exist deletedAt: null
router.get('/AllUserExist', checkAuth.checkRole(2), usersController.getAllUserExist);
// router.get('/AllUserExist', usersController.getAllUserExist);
// admin deletedAt: not null
// router.get('/', checkAuth.checkRole(3), usersController.getAllUser);
router.get('/', usersController.getAllUser);

module.exports = router;