/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();

const {
  show_user,
  delete_user,
} = require('../controller/admin/management_users');

const {
  show_lesson,
  new_lesson,
  delete_lesson,
} = require('../controller/admin/management_lesson');

const {
  show_category,
  new_category,
  delete_category,
  detail_category,
  update_category,
} = require('../controller/admin/management_category');
// USER
router.get('/users_management', show_user);
router.get('/delete-user/:userID', delete_user);

// LESSON
router.get('/lesson_management', show_lesson);
router.post('/new_lesson', new_lesson);
router.get('/delete-lesson/:lessonID', delete_lesson);
// router.route("/lesson/:lessonID")

// CATEGORY
router.get('/category_management', show_category);
router.post('/new_category', new_category);
router.get('/delete-category/:categoryID', delete_category);
router.route('/category/:categoryID')
  .get(detail_category)
  .post(update_category);
router.post('/test', (req, res) => {
  res.send({
    name: 'yo',
    age: 19,
  });
});
module.exports = router;
