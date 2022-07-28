import express from 'express';
import jobController from '../controller/jobController';
const router = express.Router();

router.get('/alo', (req, res)=>{
    res.send('alo');
});

module.exports = router;