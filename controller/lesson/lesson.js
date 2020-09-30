const db = require("../../config/mysql")
const show_lesson = (req, res) => {
  let getLesson_client = "select Lesson.lessonName,Lesson.lessonID,Lesson.lessonDescription,Lesson.userID,Account.username from ((Lesson inner join Category on Category.categoryID= Lesson.categoryID) inner join Account on Account.userID=Lesson.userID)";
  db.query(getLesson_client, (err, data) => {
    if (err) throw err;
    res.render("students/lesson/lesson", {
      lesson: data
    })
  })
}
module.exports = {
  show_lesson
}