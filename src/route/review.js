import express from 'express';
import reviewController from '../controller/reviewController';
import checkAuth from '../middleware/checkAuth';
const router = express.Router();


router.post('/createFormReview', reviewController.createFormReview);

router.get('/AllFormReview', checkAuth.checkRole(3), reviewController.getAllFormReview);

router.get('/AllFormReviewUser', reviewController.getAllFormReviewById);

router.get('/:id/editFormReview', reviewController.editFormReview);

router.put('/:id/updateFormReview', reviewController.updateFormReview);

router.delete('/:id/deleteFormReview', reviewController.deleteFormReview);


module.exports = router;