const db = require('../../config/mysql');

const show = (req, res, next) => {
	const get = 'select Lesson.lessonName,Lesson.lessonID,Lesson.lessonDescription,Lesson.userID,Account.username,Lesson.categoryID from ((Lesson inner join Category on Category.categoryID= Lesson.categoryID) inner join Account on Account.userID=Lesson.userID)';
	const category = 'select*from Category';
	db.query(`${get};${category}`, (err, data) => {
		if (err) return next(err);
		res.render('users/library/library', {
			lessons: data[0],
			categories: data[1],
		});
	});
};

module.exports = { show };
