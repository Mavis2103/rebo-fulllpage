const db = require('../../config/mysql')

const lesson_detail = (req, res, next) => {
  let id = req.params.id;
  let get_dt = 'lessonID,lessonName,lessonDescription,categoryName,username';
  let table_category = 'inner join Category on Category.categoryID= Lesson.categoryID';
  let table_account = 'inner join Account on Account.userID = Lesson.userID';
  let get = `select ${get_dt} from Lesson ${table_category} ${table_account} where Lesson.lessonID=?`;
  db.query(get, [id], (err, data) => {
    res.render('students/lesson/lesson-detail', {
      detail: data[0]
    })
  })
}

module.exports = {
  lesson_detail
};