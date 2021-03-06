var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var AboutLoginView = require("./routes/AboutLoginView"); //로그인에 관련된 함수들
var stdinfo = require("./routes/getStudentInfo"); //학생정보를 받아오는 함수들
var lectures = require("./routes/EnrolLectureList"); //강의리스트를 받아오는 함수들
var score = require("./routes/LectureScore"); //강의리스트를 받아오는 함수들
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/enrol", lectures);
app.use("/api/login", AboutLoginView);
app.use("/api/std", stdinfo);
app.use("/api/score", score);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
