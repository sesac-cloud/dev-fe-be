const express = require('express');
const router = express.Router();

const authRouter = require('./auth.routes');
const userRouter = require('./users.routes');


router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
