const db = require("../../config/mysql");
const fetch = require("node-fetch");
const { v4: uuid } = require("uuid");
const show = (req, res, next) => {
  let get = "select*from Library_of_users where userID=?";
  let getLessonPaid = "select point,lessonID_list from Student where userID=?";
  let getLesson_client = "select Lesson.lessonName,Lesson.lessonID,Lesson.lessonDescription,Lesson.userID,Account.username from ((Lesson inner join Category on Category.categoryID= Lesson.categoryID) inner join Account on Account.userID=Lesson.userID) where lessonID in (?)";
  db.query(`${get};${getLessonPaid}`, [req.session.userID, req.session.userID], (err, data) => {
    if (err) return next(err);
    let arr = [];
    let folder = [];
    if (data[1][0]==null) {
      if (data[0][0] != null) {
        folder = JSON.parse(data[0][0].library_list);
      }
    } else {
      let list = JSON.parse(data[1][0].lessonID_list);
      for (const i in list) {
        if (list.hasOwnProperty(i)) {
          const element = list[i];
          arr.push(element.id);
          // console.log(arr);
        }
      }
      if (data[0][0] != null) {
        folder = JSON.parse(data[0][0].library_list);
      }
    }
    if(arr.length==0){
      let lesson_of_student = [];
      res.render("students/myLibrary/myLibrary", {
        folder,
        lesson_of_student,
      });
    }
    else{
      db.query(getLesson_client, [arr], (err, lesson_of_student) => {
        if (err) return next(err);
        res.render("students/myLibrary/myLibrary", {
          folder,
          lesson_of_student,
        });
      });
    }
  });
};
const createFolder = (req, res, next) => {
  let arr = [];
  let json = {
    id: uuid().split("-").join(""),
    list: {
      content: req.body.name,
    },
  };
  arr.push(json);
  let create = "insert into Library_of_users value(?,?)";
  let get = "select*from Library_of_users where userID=?";
  let update = "update Library_of_users set library_list=? where userID=?";
  if (req.body.name) {
    db.query(get, [req.session.userID], (err, data) => {
      if (err) return next(err);
      if (data[0] == null) {
        let arr = [json];
        db.query(create, [req.session.userID, JSON.stringify(arr)], (err, data) => {
          if (err) return next(err);
          res.json(data);
        });
      } else {
        let arr = JSON.parse(data[0].library_list);
        arr.push(json);
        db.query(update, [JSON.stringify(arr), req.session.userID], (err, data) => {
          if (err) return next(err);
          res.json(data);
        });
      }
    });
  } else {
    res.json({
      status: "failed",
    });
  }
};
const deleteFolder = (req, res, next) => {
  let id = req.params.id;

  function findValue(array) {
    return array.id == id;
  }
  let user = req.session.userID;
  db.query("select library_list from Library_of_users where userID = ? ", [user], (err, data) => {
    if (err) return next(err);
    let arr = JSON.parse(data[0].library_list);
    arr.splice(arr.findIndex(findValue), 1);
    let update = "update Library_of_users set library_list=? where userID=?";
    db.query(update, [JSON.stringify(arr), user], (err, data) => {
      if (err) return next(err);
      res.redirect("/myLibrary");
    });
  });
};

const openFolder = (req, res, next) => {
  let id = req.params.id;
  db.query("select library_list from Library_of_users where userID = ?", [req.session.userID], (err, data) => {
    if (err) return next(err);
    let arr = JSON.parse(data[0].library_list)[0];
    res.render("students/myLibrary/contentFolder", {
      arr,
    });
  });
};

/**--------------------------------- */
module.exports = {
  show,
  createFolder,
  deleteFolder,
  openFolder,
};
