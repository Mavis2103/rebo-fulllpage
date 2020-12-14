const formidable = require('formidable');
const db = require('../../config/mysql');
const cloud = require('../../config/cloudinary');

/** ------------------------------------------------------------------------------- */
const user_detail = (req, res, next) => {
	const detailUser = 'select username,email,phone_number,role,date_of_birth,avatar,avatar_ver from Account where userID = ?';
	const { userID } = req.session;
	db.query(detailUser, [userID], (err, data) => {
		if (err) return next(err);
		res.render('users/profile/profile-tab/user-detail', {
			detail: data,
			userID,
		});
	});
};

const update_user_detail = (req, res, next) => {
	const { userID } = req.params;
	const form = formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		const { username } = fields;
		const { email } = fields;
		const { phone_number } = fields;
		const { date_of_birth } = fields;
		if (err) {
			next(err);
			return;
		}
		if (files.avatar.size > 0) {
			cloud.uploader.upload(
				files.avatar.path,
				{
					public_id: `Database_REBO/avatar/${req.session.userID}`,
				},
				(error, result) => {
					if (error) return next(error);
					const updateUser = 'update Account set username=?,email=?,phone_number=?,date_of_birth=?,avatar=?,avatar_ver=? where userID=?';
					const dataAvatar = `${req.session.userID}.${result.format}`;
					db.query(updateUser, [username, email, phone_number, date_of_birth, dataAvatar, result.version, userID], (errors) => {
						if (errors) return next(errors);
						res.redirect('/profile');
					});
				}
			);
		} else {
			const updateUser = 'update Account set username=?,email=?,phone_number=?,date_of_birth=? where userID=?';
			db.query(updateUser, [username, email, phone_number, date_of_birth, userID], (error) => {
				if (error) return next(error);
				res.redirect('/profile');
			});
		}
	});
};
module.exports = {
	user_detail,
	update_user_detail,
};
