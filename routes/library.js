const express = require('express');

const router = express.Router();
const library = require('../controller/library/library');

/** url global '/library' */
router.get('/', library.show);

module.exports = router;
