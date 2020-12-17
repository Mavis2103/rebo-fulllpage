const db = require('../config/mysql');
const addCmt = (req, res, next) => {
	// arrCmt.forEach((cmt) => {
	// 	cmt.userID = cmt.user.split(/[a-z0-9].(jpg|png)/)[0];
	// });
	/* 
		dùng lessonSelected để tìm row data theo lessonID
		update cmt vào col list_comment
	*/
	// let { lessonSelected, cmt } = req.body;
	// let checkCmtAlready = 'select lessonID,list_comment from Comment';
	// let updateListCmt = 'update Comment set list_comment=? where lessonID=?';
	// let insertListCmt = 'insert into Comment (lessonID,list_comment) value(?,?) where lessonID=?';
	// db.query(checkCmtAlready, (err, check) => {
	// 	console.log(!!check[0]);
	// if (!!check[0]) {
	// 	db.query(updateListCmt, [cmt, lessonSelected], (err) => {
	// 		if (err) return next(err);
	// 	});
	// } else {
	// 	db.query(insertListCmt, [lessonSelected, cmt, lessonSelected], (err) => {
	// 		if (err) return next(err);
	// 	});
	// }
	// });
	res.json(req.body);
};
const historyCmt = (req, res, next) => {
	console.log('params', req.params.lessonSelected);
	/* 
		SQL data cmt của lessonSelected về

	*/
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
	res.json(arr);
};
module.exports = { addCmt, historyCmt };
