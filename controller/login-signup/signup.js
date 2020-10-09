// const db = require("../../../config/mysql");
const bcrypt = require("bcrypt")
const saltRounds = 12;
const db = require("../../config/mysql");
const {
    v4: uuid
} = require('uuid')

const signup = (req, res, next) => {
    const userID = uuid().split('-').join('');
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            let createUser = "insert into Account (userID,username,password,email,role) value(?,?,?,?,?)";
            db.query(createUser, [userID, username, hash, email, role], (error, data, field) => {
                if (error) throw error;
                res.redirect("/login-signup")
            })
        })
    })
}
module.exports = signup