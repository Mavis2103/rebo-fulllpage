const db = require('../config/mysql');
const lesson_save = (req, res, next) => {
	let arr = [];
	const { id } = req.body;
	const u = req.session.userID;
	const str = {
		id,
	};
	const getJson = 'select userID,lessonID_list from LessonOfAccount where userID = ?';
	db.query(getJson, [u], (err, data) => {
		console.log(data[0]);
		if (err) return next(err);
		if (data[0] === undefined) {
			arr = [str];
			const add = JSON.stringify(arr);
			const insertJson = 'insert into LessonOfAccount (userID,lessonID_list) value(?,?)';
			db.query(insertJson, [u, add], (error) => {
				if (error) return next(error);
				res.json({ state: 'success' });
			});
		} else if (Buffer.from(data[0].userID, 'hex').toString('utf8') === u) {
			if (data[0].lessonID_list === '') {
				arr.push(str);
				const add = JSON.stringify(arr);
				const updateJson = 'update LessonOfAccount set lessonID_list=? where userID=?';
				db.query(updateJson, [add, u], (error) => {
					if (error) return next(error);
					res.json({ state: 'success' });
				});
			} else {
				arr = JSON.parse(data[0].lessonID_list);
				arr.push(str);
				const add = JSON.stringify(arr);
				const updateJson = 'update LessonOfAccount set lessonID_list=? where userID=?';
				db.query(updateJson, [add, u], (error) => {
					if (error) return next(error);
					res.json({ state: 'success' });
				});
			}
		} else {
			res.json({ state: 'failed' });
		}
	});
};

const lesson_unsave = (req, res, next) => {
	const { id } = req.body;
	console.log(id);
	const user = req.session.userID;
	db.query('select lessonID_list from LessonOfAccount where userID = ? ', [user], (err, data) => {
		if (err) return next(err);
		const arr = JSON.parse(data[0].lessonID_list);
		const newArr = arr.filter((item) => {
			return item.id != id;
		});
		const update = 'update LessonOfAccount set lessonID_list=? where userID=?';
		db.query(update, [JSON.stringify(newArr), user], (error) => {
			if (error) return next(error);
			res.json({ state: 'Delete success' });
		});
	});
};
module.exports = { lesson_save, lesson_unsave };
