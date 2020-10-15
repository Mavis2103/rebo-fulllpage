const express = require('express');

const router = express.Router();

const signup = require('../controller/login-signup/signup');
const login = require('../controller/login-signup/login');

router.get('/login-signup', (req, res) => {
  res.render('main/login-signup');
});
router.post('/signup', signup);
router.get('/login', login);

module.exports = router;
