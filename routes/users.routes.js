const express = require('express');
const uploadImage = require('../middlewares/aws-s3-upload');
const UploadController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rekogMiddleware = require('../middlewares/aws-rekognition.middleware');
const multer = require("multer");
const router = express.Router();
const uploadController = new UploadController();

console.log('users.routes.js');
router.post('/uploads',authMiddleware,uploadController.sendMQ, uploadController.test2);
router.get('/getUsers',authMiddleware, uploadController.getUser);

router.get('/a', async (req, res) => {
res.status(200).json({status: "200", message: 'ok'});
});


module.exports = router;
