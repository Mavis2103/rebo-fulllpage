const fetch = require('node-fetch');
const db = require('../../config/mysql');

let resultAll;
const searchInDB = (req, res, next) => {
	const { role, id } = req.params;
	const responseDataFromDB = { role, id };
	res.render('users/search', { responseDataFromDB });
};
const fetchAllData = async () => {
	let url = 'http://rebo-vn2.herokuapp.com/api/data';
	try {
		resultAll = await fetch(url).then((rs) => rs.json());
	} catch (error) {
		console.log(error);
	}
};
const searchNoDB = async (req, res, next) => {
	const value_from_input = req.params.value_from_input;
	let lessonArrID = [];
	await fetchAllData(value_from_input);
	let new_result = resultAll.filter((item) => {
		// return item.keyword.toLowerCase().includes(value_from_input);
		return item.lessonName.toLowerCase().includes(value_from_input) || item.username.toLowerCase().includes(value_from_input) || item.categoryName.toLowerCase().includes(value_from_input);
	});
	new_result.forEach((item) => {
		let { id } = item;
		lessonArrID.push(id);
	});
	// console.log(JSON.stringify(lessonArrID.ele_lesson).replace(/[\[]/g, '(').replace(/[\]]/g, ')'));
	db.query(`select Lesson.lessonID,Lesson.categoryID,Category.categoryName,Lesson.userID,Account.username from ((Lesson inner join Category on Category.categoryID=Lesson.categoryID) inner join Account on Account.userID = Lesson.userID) WHERE lessonID IN ${JSON.stringify(lessonArrID).replace(/[\[]/g, '(').replace(/[\]]/g, ')')}`, (err, data) => {
		if (err) return next(err);
		data.forEach((item) => {
			item.lessonID = Buffer.from(item.lessonID, 'binary').toString('utf8');
			item.categoryID = Buffer.from(item.categoryID, 'binary').toString('utf8');
			item.userID = Buffer.from(item.userID, 'binary').toString('utf8');
		});
		res.render('users/search', { value_from_input, resultNotDB: new_result, dataInfoLesson: data });
	});
};
module.exports = { searchInDB, searchNoDB };
