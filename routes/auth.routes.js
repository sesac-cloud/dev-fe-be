const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');


const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.loginUser);
router.post('/logout',authMiddleware, authController.logoutUser);

module.exports = router;
