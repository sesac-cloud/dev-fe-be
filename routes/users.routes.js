const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const UploadController = require('../controllers/users.controller');
const loggingMiddleware = require('../middlewares/logging.middleware'); // login.middlewares.js에서 가져옴
const uploadController = new UploadController();

router.use(loggingMiddleware);
router.post('/uploads', authMiddleware, uploadController.sendMQ);
router.get('/getUsers', authMiddleware, uploadController.getUser);

module.exports = router;
