const express = require("express");
const router = express.Router();

const {
  show_user,
  delete_user
} = require("./management_users")

const {
  show_lesson,
  new_lesson,
  delete_lesson
} = require("./management_lesson")

const {
  show_category,
  new_category,
  delete_category
} = require("./management_category")
// USER
router.get("/users_management", show_user)
router.get("/delete-user/:userID", delete_user)

// LESSON
router.get("/lesson_management", show_lesson)
router.post("/new_lesson", new_lesson)
router.get("/delete-lesson/:lessonID", delete_lesson)
// CATEGORY
router.get("/category_management", show_category)
router.post("/new_category", new_category)
router.get("/delete-category/:categoryID", delete_category)
module.exports = router