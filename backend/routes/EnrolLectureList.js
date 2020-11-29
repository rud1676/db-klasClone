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
        console.log(row);
        res.json({
          stdlecture: row
        });
        connection.release();
      }
    );
  });
});

module.exports = router;
