/* eslint-disable no-shadow */
const db = require('../../config/mysql');

const lesson_detail = (req, res, next) => {
	const { id } = req.params;
	const get_dt = 'lessonID,lessonName,lessonDescription,categoryName,username';
	const table_category = 'inner join Category on Category.categoryID= Lesson.categoryID';
	const table_account = 'inner join Account on Account.userID = Lesson.userID';
	const get = `select ${get_dt} from Lesson ${table_category} ${table_account} where Lesson.lessonID=?`;
	db.query(get, [id], (err, data) => {
		if (err) return next(err);
		res.render('users/lesson/lesson-detail', {
			detail: data[0],
		});
	});
};

const lesson_buy = (req, res, next) => {
	let arr = [];
	const { id } = req.params;
	const u = req.session.userID;
	const str = {
		id,
	};
	const getJson = 'select userID,lessonID_list from LessonOfAccount where userID = ?';
	db.query(getJson, [u], (err, data) => {
		if (err) return next(err);
		if (!!data[0] === false) {
			arr = [str];
			const add = JSON.stringify(arr);
			const insertJson = 'insert into LessonOfAccount (userID,lessonID_list) value(?,?)';
			db.query(insertJson, [u, add], (error) => {
				if (error) return next(error);
				res.redirect('/lesson');
			});
		} else if (Buffer.from(data[0].userID, 'hex').toString('utf8') === u) {
			if (!!data[0].lessonID_list===true) {
				arr = JSON.parse(data[0].lessonID_list);
				arr.push(str);
				const add = JSON.stringify(arr);
				const updateJson = 'update LessonOfAccount set lessonID_list=? where userID=?';
				db.query(updateJson, [add, u], (error) => {
					if (error) return next(error);
					res.redirect('/lesson');
				});
			}
			else{
				arr=[str];
				const add = JSON.stringify(arr);
				const updateJson = 'update LessonOfAccount set lessonID_list=? where userID=?';
				db.query(updateJson, [add, u], (error) => {
					if (error) return next(error);
					res.redirect('/lesson');
				});
			}
		} else {
			res.redirect('/lesson');
		}
	});
};

module.exports = {
	lesson_detail,
	lesson_buy,
};
