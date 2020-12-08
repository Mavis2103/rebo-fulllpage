let result_term;
const searchInDB = (req, res, next) => {
	const role = req.params.role;
	const id = req.params.id;
	console.log(role, id);
	res.render('users/search');
};
const searchNoDB = (req, res, next) => {
	const value = req.params.value_from_input;
	result_term = req.body;
	console.log(value, result_term);
	res.redirect(`/search/${value}`);
	// res.render('users/search');
};
const sendResults = (req, res, next) => {
	res.send(result_term);
};
module.exports = { searchInDB, searchNoDB, sendResults };
