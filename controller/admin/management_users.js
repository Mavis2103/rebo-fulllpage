/* eslint-disable consistent-return */
const db = require('../../config/mysql');
const cloud = require('../../config/cloudinary');

const show_user = (req, res, next) => {
  const getUsers = "select userID,username,email,phone_number,role,birthFrom from Account where role!='admin'";
  db.query(getUsers, (err, data) => {
    if (err) return next(err);
    res.render('admin/management_users', {
      list: data,
    });
  });
};
const delete_user = (req, res, next) => {
  const { userID } = req.params;
  const deleteUser = 'delete from Account where userID=?';
  db.query(deleteUser, [userID], (err) => {
    if (err) return next(err);
    cloud.uploader.destroy(`Database_REBO/avatar/${userID}`, (error) => {
      if (error) return next(error);
      res.redirect('/users_management');
    });
  });
};

module.exports = {
  show_user,
  delete_user,
};
