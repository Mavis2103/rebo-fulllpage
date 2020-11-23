const express = require('express');

const router = express.Router();

const x = require('../controller/lesson/lesson');

router.get('/', x.show_lesson);
router.get('/:numberPagination', x.show_lesson);
router.post('/', x.new_lesson);

/** ---------------------------------------- */

const y = require('../controller/lesson/lesson-detail');

router.get('/detail/:id', y.lesson_detail);
router.get('/buyNow/:id', y.lesson_buy);

/** ----------------------------------------- */

module.exports = router;
