const formidable = require('formidable');
const {
  v4: uuidv4,
  v5: uuidv5,
} = require('uuid');
const db = require('../../config/mysql');
const cloud = require('../../config/cloudinary');

const show_lesson = (req, res, next) => {
  const getLesson = 'select*from Lesson inner join Category on Category.categoryID= Lesson.categoryID';
  const getCategory = 'select*from Category';
  db.query(`${getLesson};${getCategory}`, (err, data) => {
    if (err) return next(err);
    const data_length = data[1].length;
    for (let index = 0; index < data_length; index += 1) {
      const element = data[1][index];
      element.categoryID = Buffer.from(data[1][index].categoryID, 'hex').toString('utf8');
    }
    res.render('admin/management_lesson', {
      lesson: data[0],
      category: data[1],
    });
  });
};
const new_lesson = (req, res, next) => {
  const form = formidable.IncomingForm();
  form.parse(req, (err, fields, file) => {
    if (err) {
      next(err);
      return;
    }
    const userID_createLesson = req.session.userID;
    const namespace = 'e8cf9158-0366-4d07-acfc-9c875fef95b2';
    const id = uuidv5(uuidv4(), namespace);
    const lessonID = id.split('-').join('');
    const {
      lessonName,
      categoryID,
      lessonDescription,
    } = fields;
    const lessonImg = file.lessonImage.name;
    if (file.lessonImage.size > 0) {
      const newLesson = 'insert into Lesson (lessonID,lessonName,userID,categoryID,lessonImage,lessonDescription) value(?,?,?,?,?,?)';
      db.query(newLesson,
        [lessonID, lessonName, userID_createLesson, categoryID, lessonImg, lessonDescription],
        (error) => {
          if (error) return next(error);
          cloud.uploader.upload(file.lessonImage.path, {
            public_id: `Database_REBO/lessonImage/${lessonID}`,
          }, (errors) => {
            if (errors) return next(errors);
            res.redirect('/lesson_management');
          });
        });
    } else {
      const newLesson = 'insert into Lesson (lessonID,lessonName,userID,categoryID,lessonDescription) value(?,?,?,?,?)';
      db.query(newLesson,
        [lessonID, lessonName, userID_createLesson, categoryID, lessonDescription],
        (errors) => {
          if (errors) return next(errors);
          res.redirect('/lesson_management');
        });
    }
  });
};
const delete_lesson = (req, res, next) => {
  const { lessonID } = req.params;
  const deleteLesson = 'delete from Lesson where lessonID=?';
  db.query(deleteLesson, [lessonID], (error) => {
    if (error) return next(error);
    cloud.uploader.destroy(`Database_REBO/lessonImage/${lessonID}`, (err) => {
      if (err) return next(err);
      res.redirect('/lesson_management');
    });
  });
};
module.exports = {
  show_lesson,
  new_lesson,
  delete_lesson,
};
