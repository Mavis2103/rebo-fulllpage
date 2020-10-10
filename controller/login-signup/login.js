const db = require("../../config/mysql");
const bcrypt = require("bcrypt");

const login = (req, res, next) => {
    let email = req.query.email;
    let passwordI = req.query.passwordInput;
    let getUser = "select*from Account where email =?";
    db.query(getUser, [email], (error, data, field) => {
        if (error) return next(err);
        bcrypt.compare(passwordI, data[0].password, (err, result) => {
            if (result) {
                req.session.userID = Buffer.from((data[0].userID), 'hex').toString('utf8');
                req.session.username = data[0].username;
                req.session.role = data[0].role;
                req.session.avatar = data[0].avatar;
                if (data[0].role == 'admin') {
                    res.redirect("/users_management")
                } else {
                    res.redirect("/dashboard")
                }
            } else res.redirect("/login-signup")
        })
    })
}
module.exports = login