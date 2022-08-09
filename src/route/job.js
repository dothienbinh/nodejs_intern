import express from 'express';
import jobController from '../controller/jobController';
const router = express.Router();

router.get('/alo', jobController.index);

router.post('/createJob', jobController.createJob);

module.exports = router;