const db = require('../config/mysql')
const getFolder = (req, res) => {
  // let get = "select*from Library_of_users where userID=?";
  // db.query(get, [req.session.userID], (err, data) => {
  //   if (err) throw err;
  //   if (data[0] == null) {
  //     res.render("students/myLibrary/myLibrary");
  //   } else {
  //     let folder = JSON.parse(data[0].library_list);
  //     res.json(folder)
  //   }
  // });
}
module.exports = getFolder