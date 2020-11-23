const db = require('../../config/mysql');
const formidable = require('formidable');
const { v4: uuidv4, v5: uuidv5 } = require('uuid');
const cloud = require('../../config/cloudinary');
const fs = require('fs');

const show_lesson = (req, res, next) => {
	db.query('select Lesson.lessonName from Lesson', (error, dataL) => {
		if (error) return next(error);
		const numberPagination = req.params.numberPagination || 0;
		const maxLesson = 2;
		const pageSize = Math.ceil(dataL.length / maxLesson);
		const getLesson_client = `select Lesson.lessonName,Lesson.lessonID,Lesson.lessonDescription,Lesson.userID,Account.username from ((Lesson inner join Category on Category.categoryID= Lesson.categoryID) inner join Account on Account.userID=Lesson.userID) limit ${numberPagination * maxLesson},${maxLesson}`;
		const getCategory = 'select*from Category';
		db.query(`${getLesson_client};${getCategory}`, (err, data) => {
			if (err) return next(err);
			const data_length = data[1].length;
			for (let index = 0; index < data_length; index += 1) {
				const element = data[1][index];
				element.categoryID = Buffer.from(data[1][index].categoryID, 'hex').toString('utf8');
			}

			res.render('students/lesson/lesson', {
				lesson: data[0],
				categories: data[1],
				role: req.session.role,
				pagination: pageSize,
			});
		});
	});
};
const new_lesson = (req, res, next) => {
	const form = formidable.IncomingForm();
	// form.maxFileSize = 1 * 1024 * 1024;
	form.parse(req, (err, fields, file) => {
		if (err) {
			return next(err);
		}
		const userID_createLesson = req.session.userID;
		const namespace = '7695f1dc-8a89-49ef-8f88-22a193903249';
		const id = uuidv5(uuidv4(), namespace);
		const lessonID = id.split('-').join('');
		const { lessonName, categoryID, lessonDescription } = fields;
		const lessonImg = file.lessonImage.name;
		if (0 < file.lessonImage.size && file.lessonSlide.size < 1 * 1024 * 1024 && file.lessonSlide.size > 0) {
			const newLesson = 'insert into Lesson (lessonID,lessonName,userID,categoryID,lessonImage,lessonDescription,lessonSlide) value(?,?,?,?,?,?,?)';
			readStr = fs.createReadStream(file.lessonSlide.path, { encoding: 'utf8' });
			readStr.on('error', (err) => {
				return next(err);
			});
			readStr.on('data', (slideData) => {
				db.query(newLesson, [lessonID, lessonName, userID_createLesson, categoryID, lessonImg, lessonDescription, slideData], (error) => {
					if (error) return next(error);
					cloud.uploader.upload(
						file.lessonImage.path,
						{
							public_id: `Database_REBO/lessonImage/${lessonID}`,
						},
						(errors) => {
							if (errors) return next(errors);
							res.redirect('/lesson');
						}
					);
				});
			});
		} else {
			const newLesson = 'insert into Lesson (lessonID,lessonName,userID,categoryID,lessonDescription) value(?,?,?,?,?)';
			db.query(newLesson, [lessonID, lessonName, userID_createLesson, categoryID, lessonDescription], (errors) => {
				if (errors) return next(errors);
				res.redirect('/lesson');
			});
		}
	});
};
module.exports = {
	show_lesson,
	new_lesson,
};
