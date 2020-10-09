const db = require("../config/mysql");

const login_success = (req, res, next) => {
  let getUser = " select username,avatar from Account where userID=?";
  db.query(getUser, [req.session.userID], (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
  // res.send({
  //   username: req.session.username,
  //   userID: req.session.userID,
  //   avatar: req.session.avatar
  // })
};

module.exports = {
  login_success,
};
