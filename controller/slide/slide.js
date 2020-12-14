const db = require('../../config/mysql');
const show = (req, res, next) => {
	let id = req.params.id;
	let select = `select lessonSlide from LessonContent where lessonID = '${id}'`;
	db.query(select, (err, data) => {
		if (err) return next(err);
		res.render('rebo/slide', {
			slide: data,
		});
	});
};

module.exports = { show };
