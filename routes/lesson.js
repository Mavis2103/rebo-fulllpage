const express = require("express");
const router = express.Router();

const {
  show_lesson
} = require("../controller/lesson/lesson");

router.get("/lesson", show_lesson)

module.exports = router