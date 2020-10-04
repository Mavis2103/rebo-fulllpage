const db = require("../../config/mysql")
const fs = require("fs")
const path = require("path")
const formidable = require("formidable")
// const cloudinary = require("cloudinary").v2;
const cloud = require("../../config/cloudinary")
/**----------------------------------------------------------------------------------------------- */
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
    let userID_createLesson = req.session.userID;
    let lessonName = fields.lessonName;
    let categoryID = fields.categoryID;
    let lessonDescription = fields.lessonDescription;
    let lessonImg = file.lessonImage.name;
    if (file.lessonImage.size > 0) {
      let newLesson = "insert into Lesson (lessonName,userID,categoryID,lessonImage,lessonDescription) value(?,?,?,?,?)";
      db.query(newLesson, [lessonName, userID_createLesson, categoryID, lessonImg, lessonDescription], (err, data) => {
        if (err) throw err;
        // fs.writeFile(path.join(__dirname, `../../public/images/dbImage/lessonImage/${data.insertId}`), lessonImg, (err) => {
        //   if (err) throw err;
        // });
        cloud.uploader.upload(file.lessonImage.path, {
              public_id: `Database_REBO/lessonImage/${data.insertId}`
            }, (err, result) => {
          if (err) throw err;
          res.redirect("/lesson_management");
        })
      })
    } else {
      let newLesson = "insert into Lesson (lessonName,userID,categoryID,lessonDescription) value(?,?,?,?)";
      db.query(newLesson, [lessonName, userID_createLesson, categoryID, lessonDescription], (err, data) => {
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
    fs.unlink(path.join(__dirname, `../../public/images/dbImage/lessonImage/${data.insertId}`), (err) => {
    });
    cloud.uploader.destroy(`https://res.cloudinary.com/mavis/image/upload/v1601815231/Database_REBO/lessonImage/${data.insertId}`, (err, result) => {
      if (err) throw err;
      res.redirect("/lesson_management");
})
    });
}
module.exports = {
  show_lesson,
  new_lesson,
  delete_lesson
}