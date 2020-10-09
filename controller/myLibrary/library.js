const db = require("../../config/mysql");
const fetch = require('node-fetch')
const {
  v4: uuid
} = require('uuid')
const show = (req, res, next) => {
  let get = "select*from Library_of_users where userID=?";
  db.query(get, [req.session.userID], (err, data) => {
    if (err) return next(err);
    if (data[0] == null) {
      res.render("students/myLibrary/myLibrary");
    } else {
      let folder = JSON.parse(data[0].library_list);
      res.render("students/myLibrary/myLibrary", {
        folder,
      });
    }
  });
};
const createFolder = (req, res, next) => {
  let arr = [];
  let json = {
    id: uuid().split('-').join(''),
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
      status: 'failed'
    })
  }
};
const deleteFolder = (req, res, next) => {
  let id = req.params.id;

  function findValue(array) {
    return array.id == id;
  }
  let user = req.session.userID;
  db.query('select library_list from Library_of_users where userID = ? ', [user], (err, data) => {
    if (err) return next(err);
    let arr = JSON.parse(data[0].library_list);
    arr.splice(arr.findIndex(findValue), 1);
    let update = 'update Library_of_users set library_list=? where userID=?';
    db.query(update, [JSON.stringify(arr), user], (err, data) => {
      if (err) return next(err);
      res.redirect('/myLibrary');
    })
  })
}

/**--------------------------------- */
module.exports = {
  show,
  createFolder,
  deleteFolder
};
