const express = require('express');

const router = express.Router();

const x = require('../controller/lesson/lesson');

router.get('/lesson', x.show_lesson);

/** ---------------------------------------- */

const y = require('../controller/lesson/lesson-detail');

router.get('/lesson/:id', y.lesson_detail);
router.get('/lesson/buyNow/:id', y.lesson_buy);

/** ----------------------------------------- */

module.exports = router;
