const db = require('../config/mysql');

module.exports.returnData = (req, res, next) => {
	console.time();
	const lesson = 'select Lesson.lessonID,Lesson.lessonName,Category.categoryName,Account.username from ((Lesson inner join Category on Category.categoryID=Lesson.categoryID) inner join Account on Account.userID = Lesson.userID)';
	const category = 'select categoryID,categoryName from Category';
	const teacher = 'select userID,username from Account where role="teacher"';
	// db.query(`${lesson};${category};${teacher}`, (err, data) => {
	// 	if (err) return next(err);
	// 	data[0].forEach((item) => {
	// 		item.lessonID = Buffer.from(item.lessonID, 'base64').toString('utf8');
	// 	});
	// 	data[1].forEach((item) => {
	// 		item.categoryID = Buffer.from(item.categoryID, 'base64').toString('utf8');
	// 	});
	// 	data[2].forEach((item) => {
	// 		item.userID = Buffer.from(item.userID, 'base64').toString('utf8');
	// 	});
	// 	// const b64Tou8 = (str)=>{
	// 	// 	str = Buffer.from(str, 'base64').toString('utf8');
	// 	// }
	// 	let bigData = data[2].concat(data[1], data[0]);
	// 	let dataSearch = [];
	// 	bigData.forEach((element) => {
	// 		if (element.userID) {
	// 			element.role = 'teacher';
	// 		} else if (element.categoryID) {
	// 			element.role = 'category';
	// 		} else if (element.lessonID) {
	// 			element.role = 'lesson';
	// 		}
	// 		element.id = element.userID || element.categoryID || element.lessonID;
	// 		element.keyword = element.username || element.categoryName || element.lessonName;
	// 		const { userID, categoryID, lessonID, username, categoryName, lessonName, ...newArr } = element;
	// 		dataSearch.push(newArr);
	// 	});
	// 	res.json(dataSearch);
	// });
	let newArrData = [];
	db.query(lesson, (err, data) => {
		data.forEach((item) => {
			item.id = Buffer.from(item.lessonID, 'base64').toString('utf8');
			let { lessonID, ...newJson } = item;
			newArrData.push(newJson);
		});
		res.json(newArrData);
	});
	console.timeEnd();
};
