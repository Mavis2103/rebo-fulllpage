const db = require("../../config/mysql")
const formidable = require("formidable");
const fs = require("fs")
const path = require("path")
const cloud = require("../../config//cloudinary")

/**------------------------------------------------------------------------------- */
const user_detail = (req, res, next) => {
    let detailUser = 'select username,email,phone_number,role,birthFrom,avatar from Account where userID = ?';
    let userID = req.session.userID;
    db.query(detailUser, [userID], (err, data) => {
        if (err) return next(err);
        res.render("students/profile/profile-tab/user-detail", {
            detail: data,
            userID: userID,
        })
    })
}


const update_user_detail = (req, res, next) => {
    let userID = req.params.userID;
    const form = formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let username = fields.username;
        let email = fields.email;
        let phone_number = fields.phone_number;
        let birthFrom = fields.birthFrom;
        if (err) {
            next(err);
            return
        }
        if (files.avatar.size > 0) {
          cloud.uploader.upload(files.avatar.path, {
                public_id: `Database_REBO/avatar/${req.session.userID}`
              }, (err, result) => {
            if (err) return next(err);
            let updateUser = "update Account set username=?,email=?,phone_number=?,birthFrom=?,avatar=? where userID=?";
            let dataAvatar = `${req.session.userID}.${result.format}`;
            db.query(updateUser, [username, email, phone_number, birthFrom, dataAvatar, userID], (err, data) => {
              if (err) return next(err);
              res.redirect("/profile")
            })
          })
        } else {
            let updateUser = "update Account set username=?,email=?,phone_number=?,birthFrom=? where userID=?";
            db.query(updateUser, [username, email, phone_number, birthFrom, userID], (err, data) => {
                if (err) return next(err);
                res.redirect("/profile")
            })
        }
    })
}
module.exports = {
    user_detail,
    update_user_detail
}