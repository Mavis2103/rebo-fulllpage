const db = require("../../config/mysql")
const formidable = require("formidable")
const {
  v4: uuidv4,
  v5: uuidv5
} = require('uuid')
const cloud = require("../../config/cloudinary")
/**----------------------------------------------------------------------------------------------- */
const show_lesson = (req, res) => {
  let getLesson = "select*from Lesson inner join Category on Category.categoryID= Lesson.categoryID"
  let getCategory = "select*from Category";
  db.query(`${getLesson};${getCategory}`, (err, data) => {
    for (const index in data[1]) {
      const element = data[1][index];
      element['categoryID'] = Buffer.from(data[1][index].categoryID, 'hex').toString('utf8');
    }
    res.render("admin/management_lesson", {
      lesson: data[0],
      category: data[1]
    })
  })
}
const new_lesson = (req, res, next) => {
  const form = formidable.IncomingForm();
  form.parse(req, (err, fields, file) => {
    if (err) {
      next(err);
      return
    }
    let userID_createLesson = req.session.userID;
    let namespace = 'e8cf9158-0366-4d07-acfc-9c875fef95b2';
    let id = uuidv5(uuidv4(), namespace)
    let lessonID = id.split('-').join('');
    let {
      lessonName,
      categoryID,
      lessonDescription
    } = fields;
    let lessonImg = file.lessonImage.name;
    if (file.lessonImage.size > 0) {
      let newLesson = "insert into Lesson (lessonID,lessonName,userID,categoryID,lessonImage,lessonDescription) value(?,?,?,?,?,?)";
      db.query(newLesson, [lessonID, lessonName, userID_createLesson, categoryID, lessonImg, lessonDescription], (err, data) => {
        if (err) return next(err)
        // fs.writeFile(path.join(__dirname, `../../public/images/dbImage/lessonImage/${data.insertId}`), lessonImg, (err) => {
        //   if (err) throw err;
        // });
        cloud.uploader.upload(file.lessonImage.path, {
              public_id: `Database_REBO/lessonImage/${lessonID}`
            }, (err, result) => {
          if (err) return next(err);
          res.redirect("/lesson_management");
        })
      })
    } else {
      let newLesson = "insert into Lesson (lessonID,lessonName,userID,categoryID,lessonDescription) value(?,?,?,?,?)";
      db.query(newLesson, [lessonID, lessonName, userID_createLesson, categoryID, lessonDescription], (err, data) => {
        if (err) return next(err);
        res.redirect("/lesson_management")
      })

    }
  })
}
const delete_lesson = (req, res, next) => {
  let lessonID = req.params.lessonID;
  let deleteLesson = "delete from Lesson where lessonID=?";
  db.query(deleteLesson, [lessonID], (err, data) => {
    if (err) return next(err);
    cloud.uploader.destroy(`https://res.cloudinary.com/mavis/image/upload/v1601815231/Database_REBO/lessonImage/${lessonID}`, (err, result) => {
      if (err) return next(err);
      res.redirect("/lesson_management");
  })
});
}
module.exports = {
  show_lesson,
  new_lesson,
  delete_lesson
}