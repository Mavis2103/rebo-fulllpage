const db = require('../config/mysql');

const getLesson = (req, res, next) => {
	console.time();
	const { id } = req.params;
	const get_dt = 'lessonID,lessonName,lessonDescription,categoryName,username';
	const get_info = 'select lessonID_list from LessonOfAccount where userID = ? ';
	const table_category = 'inner join Category on Category.categoryID= Lesson.categoryID';
	const table_account = 'inner join Account on Account.userID = Lesson.userID';
	const get = `select ${get_dt} from Lesson ${table_category} ${table_account} where Lesson.lessonID=?`;
	db.query(`${get};${get_info}`, [id, req.session.userID], (err, data) => {
		if (err) return next(err);
		let overview = data[0][0];
		let info = data[1][0];
		overview.lessonID = Buffer.from(overview.lessonID, 'hex').toString('utf8');
		let state = 0;
		JSON.parse(info.lessonID_list).filter((findID) => {
			findID.id === id && (state = 1);
		});
		overview.state = state;
		res.json({ lesson: { overview } });
	});
	console.timeEnd();
};
module.exports = { getLesson };
