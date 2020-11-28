var db = require("../db.js");
var express = require("express");
var router = express.Router();

const Errorthrow = (res, err) => {
  res.json({
    success: false
  });
  throw err;
};

router.post("/lecturelist", (req, res) => {
  const stdid = req.body.stdid;
  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    connection.query(
      "select l.lecture_code, l.lecture_name from student_lecture as s join lecture as l on s.lecture_code = l.lecture_code where s.s_id = " +
        stdid,
      (err, row) => {
        if (err) Errorthrow(res, err);
        res.json({
          lectures: row
        });
        connection.release();
      }
    );
  });
});

module.exports = router;
