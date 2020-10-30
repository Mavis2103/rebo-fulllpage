const express = require('express');

const router = express.Router();

/** ------------------------------- */
const { login_success } = require('./login-success');

router.route('/user/login-success').get(login_success);

/** ------------------------------- */
const { getFolder } = require('./folder');

router.get('/getFolder', getFolder);

/** ------------------------------- */
const { getLesson } = require('./OO-lesson-detail');

router.route('/lesson/:id').get(getLesson);
module.exports = router;
