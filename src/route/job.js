import express from 'express';
import jobController from '../controller/jobController';
import checkAuth from '../middleware/checkAuth';
const router = express.Router();

router.post('/createFromJob', jobController.createFromJob);

router.get('/AllFormJob', checkAuth.checkRole(3), jobController.getAllFormJob);

router.get('/AllFormJobUser', jobController.getAllFormJobByIdUser);

router.get('/:id/editFormJob', jobController.editFormJob);

router.put('/:id/updateFormJob', jobController.updateformJob);

router.delete('/:id/deleteFormJob', jobController.deleteFormJob);

module.exports = router;