const express = require('express');

const router = express.Router();
const path = require('path');
/* GET home page. */

router.use(express.static(path.join(__dirname, 'public')));
// var html = pug.renderFile("./views/students/dashboard/dashboard.pug");
router.get('/user-detail', (req, res) => {
  res.render('students/profile/profile-tab/user-detail');
});
router.get('/user-privacy', (req, res) => {
  res.render('students/profile/profile-tab/user-privacy');
});
// var jsFunctionString = pug.compileFileClient("./views/test.pug", { name: "fancyTemplateFun" });
// fs.writeFileSync("../load.js", jsFunctionString);

module.exports = router;
