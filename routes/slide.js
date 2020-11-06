const express = require('express');
const router = express.Router();

const slide_controller = require('../controller/slide/slide');
router.get('/:id', slide_controller.show);

module.exports = router;
