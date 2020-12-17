/* eslint-disable guard-for-in */
const { v4: uuid } = require('uuid');
const db = require('../../config/mysql');

const show = (req, res, next) => {
	const get = 'select*from LibraryOfAccount where userID=?';
	const getLessonPaid = 'select point,lessonID_list from LessonOfAccount where userID=?';
	const getLesson_client = 'select Lesson.lessonName,Lesson.lessonID,Lesson.lessonDescription,Lesson.userID,Account.username from ((Lesson inner join Category on Category.categoryID= Lesson.categoryID) inner join Account on Account.userID=Lesson.userID) where lessonID in (?)';
	db.query(`${get};${getLessonPaid}`, [req.session.userID, req.session.userID], (err, data) => {
		if (err) return next(err);
		const arr = [];
		let folder = [];

		if  (!!data[0][0])  {
			folder = JSON.parse(data[0][0].library_list);
		}
		if  (!!data[1][0].lessonID_list)  {
			const list = JSON.parse(data[1][0].lessonID_list);
			const list_length = list.length;
			for (let i = 0; i < list_length; i += 1) {
				arr.push(list[i].id);
			}
		}
		// if (!!data[1][0]===false) {
		// 	if (data[0][0] != null) {
		// 		folder = JSON.parse(data[0][0].library_list);
		// 	}
		// } else {
		// 	if  (!!data[1][0].library_list)  {
		// 		const list = JSON.parse(data[1][0].lessonID_list);
		// 		const list_length = list.length;
		// 		for (let i = 0; i < list_length; i += 1) {
		// 			arr.push(list[i].id);
		// 		}
		// 		if (data[0][0] != null) {
		// 			folder = JSON.parse(data[0][0].library_list);
		// 		}
		// 	}
		// }
		const lesson_of_student = [];
		if (arr.length === 0) {
			res.render('users/myLibrary/myLibrary', {
				folder,
				lesson_of_student,
			});
		} else {
			db.query(getLesson_client, [arr], (error, lesson_of_student) => {
				if (error) return next(error);
				res.render('users/myLibrary/myLibrary', {
					folder,
					lesson_of_student,
				});
			});
		}
	});
};
const createFolder = (req, res, next) => {
	const json = {
		id: uuid().split('-').join(''),
		list: {
			content: req.body.name,
		},
	};
	const create = 'insert into LibraryOfAccount value(?,?)';
	const get = 'select*from LibraryOfAccount where userID=?';
	const update = 'update LibraryOfAccount set library_list=? where userID=?';
	if (req.body.name) {
		db.query(get, [req.session.userID], (err, data) => {
			if (err) return next(err);
			if (data[0] == null) {
				const arr = [json];
				db.query(create, [req.session.userID, JSON.stringify(arr)], (error, result) => {
					if (error) return next(error);
					res.json(result);
				});
			} else {
				const arr = JSON.parse(data[0].library_list);
				arr.push(json);
				db.query(update, [JSON.stringify(arr), req.session.userID], (error, result) => {
					if (error) return next(error);
					res.json(result);
				});
			}
		});
	} else {
		res.json({
			status: 'failed',
		});
	}
};
const deleteFolder = (req, res, next) => {
	const { id } = req.params;

	function findValue(array) {
		return array.id === id;
	}
	const user = req.session.userID;
	db.query('select library_list from LibraryOfAccount where userID = ? ', [user], (err, data) => {
		if (err) return next(err);
		const arr = JSON.parse(data[0].library_list);
		arr.splice(arr.findIndex(findValue), 1);
		const update = 'update LibraryOfAccount set library_list=? where userID=?';
		db.query(update, [JSON.stringify(arr), user], (error) => {
			if (error) return next(error);
			res.redirect('/myLibrary');
		});
	});
};

const openFolder = (req, res, next) => {
	// const { id } = req.params;
	db.query('select library_list from LibraryOfAccount where userID = ?', [req.session.userID], (err, data) => {
		if (err) return next(err);
		const arr = JSON.parse(data[0].library_list)[0];
		res.render('users/myLibrary/contentFolder', {
			arr,
		});
	});
};

/** --------------------------------- */
module.exports = {
	show,
	createFolder,
	deleteFolder,
	openFolder,
};
