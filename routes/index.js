const express = require('express');
const router = express.Router();

// const userRouter = require('./users');
const authRouter = require('./auth.routes');
const userRouter = require('./users.routes');

// router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);


module.exports = router;