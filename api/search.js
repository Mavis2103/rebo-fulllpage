const db = require('../config/mysql');

module.exports.returnData = (req, res, next) => {
	db.query('select lessonID,lessonName from Lesson', (err, data) => {
		if (err) return next(err);
		data.forEach((item) => {
			item.lessonID = Buffer.from(item.lessonID, 'base64').toString('utf8');
		});
		res.json(data);
	});
};
