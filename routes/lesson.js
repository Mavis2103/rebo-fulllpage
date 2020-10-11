const express = require("express");
const router = express.Router();

const {
  show_lesson
} = require("../controller/lesson/lesson");

router.get("/lesson", show_lesson)

/**---------------------------------------- */

const y = require('../controller/lesson/lesson-detail');

router.get('/lesson/:id', y.lesson_detail)

module.exports = router