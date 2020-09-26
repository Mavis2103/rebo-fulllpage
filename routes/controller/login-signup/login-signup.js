const express = require("express");
const router = express.Router();

const signup = require("./signup")
const login = require("./login")

router.get("/login-signup", (req, res, next) => {
    res.render("main/login-signup")
})
router.post("/signup", signup)
router.get("/login", login)

module.exports = router;