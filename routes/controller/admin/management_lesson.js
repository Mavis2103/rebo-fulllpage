const db = require("../../config/mysql")
const fs = require("fs")
const path = require("path")
const formidable = require("formidable")
const show_lesson = (req, res) => {
  let getLesson = "select*from Lesson inner join Category on Category.categoryID= Lesson.categoryID"
  let getCategory = "select*from Category";
  db.query(`${getLesson};${getCategory}`, (err, data) => {
    res.render("admin/management_lesson", {
      lesson: data[0],
      category: data[1]
    })
  })
}
const new_lesson = (req, res) => {
  const form = formidable.IncomingForm();
  form.parse(req, (err, fields, file) => {
    if (err) {
      next(err);
      return
    }
    let lessonName = fields.lessonName;
    let categoryID = fields.categoryID;
    let lessonDescription = fields.lessonDescription;
    let lessonImg = fs.readFileSync(file.lessonImage.path);

    if (file.lessonImage.size > 0) {
      let newLesson = "insert into Lesson (lessonName,categoryID,lessonImage,lessonDescription) value(?,?,?,?)";
      db.query(newLesson, [lessonName, categoryID, lessonImg, lessonDescription], (err, data) => {
        if (err) throw err;
        fs.writeFileSync(path.join(__dirname, `../../../public/images/dbImage/lessonImage/${data.insertId}`), lessonImg);
        res.redirect("/lesson_management")
      })
    } else {
      let newLesson = "insert into Lesson (lessonName,categoryID,lessonDescription) value(?,?,?)";
      db.query(newLesson, [lessonName, categoryID, lessonDescription], (err, data) => {
        if (err) throw err;
        res.redirect("/lesson_management")

      })

    }
  })
}
const delete_lesson = (req, res) => {
  let lessonID = req.params.lessonID;
  let deleteLesson = "delete from Lesson where lessonID=?";
  db.query(deleteLesson, [lessonID], (err, data) => {
    if (err) throw err;
    res.redirect("/lesson_management")
  })
}
module.exports = {
  show_lesson,
  new_lesson,
  delete_lesson
}