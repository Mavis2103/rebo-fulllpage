const db = require('../config/mysql');

const getFolder = (req, res, next) => {
	const get = 'select*from Library_of_users where userID=?';
	db.query(get, [req.session.userID], (err, data) => {
		if (err) return next(err);
		if (data[0] == null) {
			res.render('students/myLibrary/myLibrary');
		} else {
			const folder = JSON.parse(data[0].library_list);
			res.json(folder);
		}
	});
};
module.exports = {
	getFolder,
};
