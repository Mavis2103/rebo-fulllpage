const express = require('express');
const router = express.Router();

/**------------------------------- */
const {
  login_success
} = require('./login-success');
router.route('/user/login-success')
  .get(login_success)

/**------------------------------- */
const getFolder = require('./getFolder')
router.get('/getFolder', getFolder)
module.exports = router;