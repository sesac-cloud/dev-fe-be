const express = require('express');
const uploadImage = require('../middlewares/aws-s3-upload');
const UploadController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rekogMiddleware = require('../middlewares/aws-rekognition.middleware');
const multer = require("multer");
const router = express.Router();
const uploadController = new UploadController();


router.post('/uploads', authMiddleware,uploadController.sendMQ);
router.get('/getUsers',authMiddleware, uploadController.getUser);

module.exports = router;
