const express = require('express');

const router = express.Router();

/** ------------------------------- */
const { login_success } = require('./login-success');

router.route('/user/login-success').get(login_success);

/** ------------------------------- */
const { getFolder } = require('./folder');

router.get('/getFolder', getFolder);

/** ------------------------------- */
const { getLesson } = require('./OO-lesson-detail');

router.route('/lesson/:id').get(getLesson);

/** ------------------------------- */

const fileSearch = require('./search');
router.route('/data').get(fileSearch.returnData);

/** ------------------------------- */
const lesson_saveOrNot = require('./save.notsave')
router.post('/save',lesson_saveOrNot.lesson_save)
router.post('/unsave',lesson_saveOrNot.lesson_unsave)

/** ------------------------------- */
const cmt = require('./comment')
router.post('/addCmt',cmt.addCmt);
router.get('/historyCmt/:lessonSelected',cmt.historyCmt)

module.exports = router;
