/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const path = require('path');
/* GET home page. */

const login_signup = require('./login-signup');
const profile = require('./profile');
const admin = require('./admin');
const lesson = require('./lesson');
const myLibrary = require('./myLibrary');
// var profile_child = require("./students/profile/profile");

// Action profile
router.use(express.static(path.join(__dirname, 'public')));
// router.use("/", profile_child);

router.use(login_signup);
router.use(profile);
router.use(admin);
router.use(lesson);
router.use('/myLibrary', myLibrary);

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login-signup');
});

router.get('/', (req, res) => {
  res.render('main/index');
});
router.get('/dashboard', (req, res) => {
  res.render('students/dashboard/dashboard');
});
router.get('/library', (req, res) => {
  res.render('students/library/library');
});
router.get('/tools', (req, res) => {
  res.render('students/tools/tool');
});
router.get('/gift', (req, res) => {
  res.render('students/gift/gift');
});
module.exports = router;
