import express from 'express';
import jobController from '../controller/jobController';
const router = express.Router();

router.get('/alo', jobController.index);

router.post('/createFromJob', jobController.createFromJob);

router.get('/AllFormJob', jobController.getAllFormJob);

router.get('/:id/editFormJob', jobController.editFormJob);

router.put('/:id/updateFormJob', jobController.updateformJob);

router.delete('/:id/deleteFormJob', jobController.deleteFormJob);

module.exports = router;