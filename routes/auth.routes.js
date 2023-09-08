const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const loggingMiddleware = require('../middlewares/logging.middleware'); // login.middlewares.js에서 가져옴
const authController = new AuthController();

router.use(loggingMiddleware);
router.post('/login', authController.loginUser);
router.post('/logout',authMiddleware, authController.logoutUser);

module.exports = router;
