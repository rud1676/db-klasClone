var db = require("../db.js");
var express = require("express");
var router = express.Router();

const Errorthrow = (res, err) => {
  res.json({
    success: false
  });
  throw err;
};

router.get("/", (req, res) => {
  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    connection.query("select * from lecture", (err, row) => {
      if (err) Errorthrow(res, err);
      res.json({
        lectures: row
      });
      connection.release();
    });
  });
});
router.post("/stdlec", (req, res) => {
  const std = req.body.std;
  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    connection.query(
      "select * from student_lecture as s join lecture as l on l.lecture_code = s.lecture_code where s.class_semester='" +
        std.semester +
        "' and s_id = '" +
        std.stdid +
        "'",
      (err, row) => {
        if (err) Errorthrow(res, err);
        res.json({
          stdlectures: row
        });
        connection.release();
      }
    );
  });
});
router.post("/submit", (req, res) => {
  const stdlectures = req.body.lectures;
  const std = req.body.std;
  const semester = req.body.semester;
  let dblecture = null;

  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    console.log("test");
    connection.query(
      "SELECT s_id, lecture_code from student_lecture where s_id='" +
        std +
        "' and class_semester='" +
        semester +
        "'",
      function (err, row) {
        if (err) Errorthrow(res, err);
        console.log("test2");
        dblecture = row;
        for (const lecture of stdlectures) {
          if (dblecture.find((lec) => lec.lecture_code == lecture.lecture_code))
            continue;
          connection.query(
            "insert into student_lecture values('" +
              std +
              "', '" +
              stdlectures.lecture_code +
              "',0,'" +
              semester +
              "')",
            (err, row) => {
              if (err) console.log(err);
            }
          );
        }
        for (const lecture of dblecture) {
          console.log(lecture);
          if (
            stdlectures.find((lec) => lec.lecture_code == lecture.lecture_code)
          )
            continue;

          connection.query(
            "delete from student_lecture where s_id = '" +
              std +
              "' and lecture_code = '" +
              lecture.lecture_code +
              "'",
            (err, row) => {
              if (err) console.log(err);
            }
          );
        }
        res.json({
          success: true
        });
        console.log(row);
        connection.release();
      }
    );
  });
});
module.exports = router;
