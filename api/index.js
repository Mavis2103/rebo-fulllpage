const express = require('express');

const router = express.Router();

/** ------------------------------- */
const {
  // eslint-disable-next-line camelcase
  login_success,
} = require('./login-success');

router.route('/user/login-success')
  .get(login_success);

/** ------------------------------- */
const {
  getFolder,
} = require('./folder');

router.get('/getFolder', getFolder);
module.exports = router;
