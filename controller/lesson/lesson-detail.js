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

const lesson_buy = (req, res, next) => {
  let id = req.params.id;
  let u = req.session.userID;
  let arr = [];
  let str = {
    id: id,
  };
  let getJson = "select userID,lessonID_list from Student where userID = ?";
  db.query(getJson, [u], (err, data) => {
    if (err) return next(err);
    if (data[0] == undefined) {
      let arr = [str];
      let add = JSON.stringify(arr);
      let insertJson = "insert into Student (userID,lessonID_list) value(?,?)";
      db.query(insertJson, [u, add], (error, result) => {
        if (error) return next(error);
        res.redirect("/lesson");
      });
    } else if (Buffer.from(data[0].userID, "hex").toString("utf8") == u) {
      let arr = JSON.parse(data[0].lessonID_list);
      arr.push(str);
      let add = JSON.stringify(arr);
      let updateJson = "update Student set lessonID_list=? where userID=?";
      db.query(updateJson, [add, u], (error, result) => {
        if (error) return next(error);
        res.redirect("/lesson");
      });
    } else {
      res.redirect("/lesson");
    }
  });
};

module.exports = {
  lesson_detail,
  lesson_buy,
};