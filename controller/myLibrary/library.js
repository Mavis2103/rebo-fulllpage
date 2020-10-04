const db = require("../../config/mysql");
const show = (req, res) => {
  let get = "select*from Library_of_users where userID=?";
  db.query(get, [req.session.userID], (err, data) => {
    if (err) throw err;
    let folder = JSON.parse(data[0].library_list);
    res.render("students/myLibrary/myLibrary", {
      folder,
    });
  });
};
let arr = [];
const createFolder = (req, res) => {
  let json = {
    id: req.session.userID,
    list: {
      content: req.body.folderName,
    },
  };
  arr.push(json);
  // console.log(arr);
  // console.log(JSON.stringify(arr));
  // console.log(req.session.userID);
  let create = "insert into Library_of_users value(?,?)";
  let get = "select*from Library_of_users where userID=?";
  let update = "update Library_of_users set library_list=? where userID=?";
  if (req.body.folderName) {
    db.query(get, [req.session.userID], (err, data) => {
      if (err) throw err;
      if (data[0] == null) {
        let arr = [json];
        db.query(create, [req.session.userID, JSON.stringify(arr)], (err, data) => {
          if (err) throw err;
          res.redirect("/template");
        });
      } else {
        let arr = JSON.parse(data[0].library_list);
        arr.push(json);
        db.query(update, [JSON.stringify(arr), req.session.userID], (err, data) => {
          if (err) throw err;
          res.redirect("/template");
        });
      }
    });
  } else {
    res.redirect("/template");
  }
};
module.exports = {
  show,
  createFolder,
};
