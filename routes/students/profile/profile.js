var express = require("express");
var router = express.Router();
var path = require("path");
/* GET home page. */

router.use(express.static(path.join(__dirname, "public")));
// var html = pug.renderFile("./views/students/dashboard/dashboard.pug");
router.get("/user-detail", function (req, res, next) {
  res.render("students/profile/profile-tab/user-detail");
});
router.get("/user-privacy", function (req, res, next) {
  res.render("students/profile/profile-tab/user-privacy");
});
// var jsFunctionString = pug.compileFileClient("./views/test.pug", { name: "fancyTemplateFun" });
// fs.writeFileSync("../load.js", jsFunctionString);

module.exports = router;
