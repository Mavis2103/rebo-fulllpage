// const createError = require("http-errors");
var bodyParser = require('body-parser')
const express = require("express");
const session = require("express-session")
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require('dotenv').config()

const indexRouter = require("./routes/index");

const error = require("console");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser());

app.use("/md", express.static(path.join(__dirname, '/node_modules')));
app.use("/st", express.static(path.join(__dirname, '/public')));

// session
app.use(session({
  name: 'session-id',
  secret: '0783587149',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: true,
    maxAge: new Date(Date.now() + (30 * 86400 * 1000))
  }
}))

app.use("/", indexRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("main/error");
  console.log(error);
  console.log(err);
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Started!" + port);
});
module.exports = app;