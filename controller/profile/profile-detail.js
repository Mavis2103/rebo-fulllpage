const db = require("../../config/mysql")
const formidable = require("formidable");
const fs = require("fs")
const path = require("path")

const user_detail = (req, res, next) => {
    let detailUser = 'select username,email,phone_number,role,birthFrom from Account where userID = ?';
    let userID = req.session.userID;
    db.query(detailUser, [userID], (err, data) => {
        if (err) throw err;
        res.render("students/profile/profile-tab/user-detail", {
            detail: data,
            userID: userID,
                avatar: req.session.avatar
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
        let dataAvatar = fs.readFileSync(files.avatar.path);
        if (files.avatar.size > 0) {
            fs.writeFile(path.join(__dirname, `../../public/images/dbImage/avatar/${req.session.userID}`), dataAvatar, err => {
                        if (err) throw err;
                let updateUser = "update Account set username=?,email=?,phone_number=?,birthFrom=?,avatar=? where userID=?";
                db.query(updateUser, [username, email, phone_number, birthFrom, dataAvatar, userID], (err, data) => {
                    if (err) throw err;
                    res.redirect("/template")
                })
            });
        } else {
            let updateUser = "update Account set username=?,email=?,phone_number=?,birthFrom=? where userID=?";
            db.query(updateUser, [username, email, phone_number, birthFrom, userID], (err, data) => {
                if (err) throw err;
                res.redirect("/template")
            })
        }
    })
}
module.exports = {
    user_detail,
    update_user_detail
}