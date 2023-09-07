const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const path = require('path');

const authToken = require('../middlewares/auth.middleware');

router.get('/mygallery', authMiddleware ,(req, res) => {
  res.render('mygallery');
});
router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/upload',authMiddleware, (req, res) => {
  res.render('upload');
});


module.exports = router;