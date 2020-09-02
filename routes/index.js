var express = require("express");
var router = express.Router();
var pug = require("pug");
var path = require("path");
/* GET home page. */

var profile = require("./students/profile/profile");

// Action profile
router.use(express.static(path.join(__dirname, "public")));
router.use("/", profile);



router.get("/", function (req, res, next) {
  res.render("main/index");
});
// var html = pug.renderFile("./views/students/dashboard/dashboard.pug");
router.get("/template", function (req, res, next) {
  res.render("students/template");
});
router.get("/dashboard", function (req, res, next) {
  res.render("students/dashboard/dashboard");
});
router.get("/classes", function (req, res, next) {
  res.render("students/classes/classes");
});
router.get("/lesson", function (req, res, next) {
  res.render("students/lesson/lesson");
});
router.get("/tools", function (req, res, next) {
  res.render("students/tools/tool");
});
router.get("/library", function (req, res, next) {
  res.render("students/library/library");
});
router.get("/messages", function (req, res, next) {
  res.render("students/messages/messages");
});
router.get("/profile", function (req, res, next) {
  res.render("students/profile/profile");
});
router.get("/setting", function (req, res, next) {
  res.render("students/settings/setting");
});
router.get("/support", function (req, res, next) {
  res.render("students/supports/support");
});
// var jsFunctionString = pug.compileFileClient("./views/test.pug", { name: "fancyTemplateFun" });
// fs.writeFileSync("../load.js", jsFunctionString);
module.exports = router;