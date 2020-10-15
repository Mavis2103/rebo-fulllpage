/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const db = require('../../config/mysql');

const lesson_detail = (req, res, next) => {
  const { id } = req.params;
  const get_dt = 'lessonID,lessonName,lessonDescription,categoryName,username';
  const table_category = 'inner join Category on Category.categoryID= Lesson.categoryID';
  const table_account = 'inner join Account on Account.userID = Lesson.userID';
  const get = `select ${get_dt} from Lesson ${table_category} ${table_account} where Lesson.lessonID=?`;
  db.query(get, [id], (err, data) => {
    if (err) return next(err);
    res.render('students/lesson/lesson-detail', {
      detail: data[0],
    });
  });
};

const lesson_buy = (req, res, next) => {
  const arr = [];
  const { id } = req.params;
  const u = req.session.userID;
  const str = {
    id,
  };
  const getJson = 'select userID,lessonID_list from Student where userID = ?';
  db.query(getJson, [u], (err, data) => {
    if (err) return next(err);
    if (data[0] === undefined) {
      const arr = [str];
      const add = JSON.stringify(arr);
      const insertJson = 'insert into Student (userID,lessonID_list) value(?,?)';
      db.query(insertJson, [u, add], (error, result) => {
        if (error) return next(error);
        res.redirect('/lesson');
      });
    } else if (Buffer.from(data[0].userID, 'hex').toString('utf8') === u) {
      const arr = JSON.parse(data[0].lessonID_list);
      arr.push(str);
      const add = JSON.stringify(arr);
      const updateJson = 'update Student set lessonID_list=? where userID=?';
      db.query(updateJson, [add, u], (error, result) => {
        if (error) return next(error);
        res.redirect('/lesson');
      });
    } else {
      res.redirect('/lesson');
    }
  });
};

module.exports = {
  lesson_detail,
  lesson_buy,
};
