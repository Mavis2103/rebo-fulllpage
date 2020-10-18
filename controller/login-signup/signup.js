// const db = require("../../../config/mysql");
const bcrypt = require('bcrypt');

const saltRounds = 12;
const {
  v4: uuid,
} = require('uuid');
const db = require('../../config/mysql');

const signup = (req, res, next) => {
  const userID = uuid().split('-').join('');
  const { username } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { role } = req.body;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (errs, hash) => {
      const createUser = 'insert into Account (userID,username,password,email,role) value(?,?,?,?,?)';
      db.query(createUser, [userID, username, hash, email, role], (error) => {
        if (error) return next(error);
        res.redirect('/login-signup');
      });
    });
  });
};
module.exports = signup;
