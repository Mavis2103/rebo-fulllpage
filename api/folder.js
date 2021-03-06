const db = require('../config/mysql');

const getFolder = (req, res, next) => {
	const get = 'select*from LibraryOfAccount where userID=?';
	db.query(get, [req.session.userID], (err, data) => {
		if (err) return next(err);
		if (!!data[0] === false) {
			res.render('users/myLibrary/myLibrary');
		} else {
			const folder = JSON.parse(data[0].library_list);
			res.json(folder);
		}
	});
};
module.exports = {
	getFolder,
};
