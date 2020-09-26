const express = require("express");
const router = express.Router();
const {
    user_detail,
    update_user_detail
} = require("./profile-detail")

router.get("/profile", (req, res, next) => {
    res.render("students/profile/profile");
});
router.get("/user-detail", user_detail)
router.post("/update/user-detail/:userID", update_user_detail)
router.get("/user-privacy", (req, res, next) => {
    res.render("students/profile/profile-tab/user-privacy")
})
module.exports = router