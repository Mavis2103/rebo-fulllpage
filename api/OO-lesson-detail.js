const db = require('../config/mysql');

const getLesson = (req, res, next) => {
	const { id } = req.params;
	const get_dt = 'lessonID,lessonName,lessonDescription,categoryName,username';
	const table_category = 'inner join Category on Category.categoryID= Lesson.categoryID';
	const table_account = 'inner join Account on Account.userID = Lesson.userID';
	const get = `select ${get_dt} from Lesson ${table_category} ${table_account} where Lesson.lessonID=?`;
	db.query(get, [id], (err, data) => {
		if (err) return next(err);
		data[0].lessonID = Buffer.from(data[0].lessonID, 'hex').toString('utf8');
		console.log(data);
		res.json(data);
	});
};
module.exports = { getLesson };
