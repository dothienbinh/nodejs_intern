import express from 'express';
import reviewController from '../controller/reviewController';
const router = express.Router();


router.get('/alo', reviewController.index);


module.exports = router;