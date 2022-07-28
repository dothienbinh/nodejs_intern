import express from "express";
import homeController from '../controller/homeController';
const router = express.Router();

router.get('/', homeController.getHomepage);
// router.post('/getUser', homeController.getUser);
router.post('/crud', homeController.postCRUD);

module.exports = router;