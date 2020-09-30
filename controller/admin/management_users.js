const db = require("../../config/mysql")

const show_user = (req, res) => {
  let getUsers = "select userID,username,email,phone_number,role,birthFrom from Account where role!='admin'";
  db.query(getUsers, (err, data) => {
    if (err) throw err;
    res.render("admin/management_users", {
      list: data
    })
  })
}
const delete_user = (req, res) => {
  let userID = req.params.userID;
  let deleteUser = "delete from Account where userID=?";
  db.query(deleteUser, [userID], (err, data) => {
    if (err) throw err;
    res.redirect("/users_management")
  })
}

module.exports = {
  show_user,
  delete_user
};