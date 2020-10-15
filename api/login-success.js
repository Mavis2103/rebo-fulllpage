const db = require('../config/mysql');

// eslint-disable-next-line camelcase
const login_success = (req, res, next) => {
  const getUser = ' select username,avatar,email,avatar_ver from Account where userID=?';
  // eslint-disable-next-line consistent-return
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
