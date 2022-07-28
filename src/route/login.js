import express from 'express';
import loginController from '../controller/loginController';
const router = express.Router();

router.post('/logout', loginController.delCookie);
router.post('/', loginController.login)
router.get('/', loginController.index);

module.exports = router;