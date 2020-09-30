var express = require("express");
var router = express.Router();
var path = require("path");
/* GET home page. */

const login_signup = require("./login-signup")
const profile = require("./profile")
const admin = require("./admin")
const lesson = require("./lesson")
// var profile_child = require("./students/profile/profile");

// Action profile
router.use(express.static(path.join(__dirname, "public")));
// router.use("/", profile_child);

router.use(login_signup)
router.use(profile)
router.use(admin)
router.use(lesson)

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/")
})

router.get("/", function (req, res, next) {
  res.render("main/index");
});
router.get("/template", function (req, res, next) {
  res.render("students/template", {
    username: req.session.username,
    userID: req.session.userID
  });
});
router.get("/dashboard", function (req, res, next) {
  res.render("students/dashboard/dashboard");
});
router.get("/library", function (req, res, next) {
  res.render("students/library/library");
});
router.get("/tools", function (req, res, next) {
  res.render("students/tools/tool");
});
router.get("/myLibrary", function (req, res, next) {
  res.render("students/myLibrary/myLibrary");
});
router.get("/gift", function (req, res, next) {
  res.render("students/gift/gift");
});
module.exports = router;