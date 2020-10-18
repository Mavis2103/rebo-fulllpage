const db = require('../../config/mysql');

const show = (req, res, next) => {
  const get = 'select Lesson.lessonName,Lesson.lessonID,Lesson.lessonDescription,Lesson.userID,Account.username from ((Lesson inner join Category on Category.categoryID= Lesson.categoryID) inner join Account on Account.userID=Lesson.userID)';
  db.query(get, (err, data) => {
    if (err) return next(err);
    res.render('students/library/library', { lesson: data });
  });
};

module.exports = { show };
