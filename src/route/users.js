import express from 'express';
import usersController from '../controller/usersController';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        console.log('alo');
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });


router.post('/login', usersController.loginUser);
router.post('/createUser', usersController.createUser);
router.post('/deleteUser', usersController.deleteUser);
router.post('/upload-profile-pic', upload.single('avatar'), usersController.handleUploadFile)
router.get('/userInfo', usersController.getInfoUser);
router.get('/', usersController.getAllUser);

module.exports = router;