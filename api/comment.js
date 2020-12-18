let db = require('../config/mysql');
const addCmt = (req, res, next) => {
  let { lessonSelected, cmt } = req.body;
  let checkCmtAlready = 'select lessonID,list_comment from Comment where lessonID=?';
  let updateListCmt = 'update Comment set list_comment=? where lessonID=?';
  let insertListCmt = 'insert into Comment (lessonID,list_comment) value(?,?)';
  db.query(checkCmtAlready, [lessonSelected], (err, check) => {
    if (err) return next(err);
    if (!!check[0]) {
      if (!!check[0].list_comment) {
        let newArr = JSON.parse(check[0].list_comment);
        newArr.push(cmt);
        db.query(updateListCmt, [JSON.stringify(newArr), lessonSelected], (err, data) => {
          if (err) return next(err);
          res.json(req.body);
        });
      }
    } else {
      const arr = [];
      arr.push(cmt);
      db.query(insertListCmt, [lessonSelected, JSON.stringify(arr)], (err, data) => {
        if (err) return next(err);
        res.json(req.body);
      });
    }
  });
};
const historyCmt = (req, res, next) => {
  let { lessonSelected } = req.params;
  let arr = [
    {
      user: '20ff9605b2c94f53bfd8228180a50367.png',
      avatar_ver: '1605460419',
      msg: 'Hello',
    },
    {
      user: '20ff9605b2c94f53bfd8228180a50367.png',
      avatar_ver: '1605460419',
      msg: 'World',
    },
  ];
  let get = 'select list_comment from Comment where lessonID=?';
  db.query(get, [lessonSelected], (err, cmt) => {
    if (err) return next(err);
    if (!!cmt[0]) {
      let history = JSON.parse(cmt[0].list_comment);
      res.json(history);
    } else {
      res.json({ history: 'empty' });
    }
  });
};
module.exports = { addCmt, historyCmt };
