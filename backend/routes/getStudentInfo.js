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
      "select l.lecture_code, l.lecture_name, p.p_name from student_lecture as s inner join lecture as l on l.lecture_code = s.lecture_code inner join professor as p on l.p_id = p.p_id where s.s_id = '" +
        stdid +
        "'",
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

router.post("/professor", (req, res) => {
  const stdid = req.body.stdid;
  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    connection.query(
      "select p.p_name , p.p_sex,p.p_tel_no,p.p_e_mail from student as s join professor as p on p.p_id = s.p_id where s_id = " +
        stdid,
      (err, row) => {
        if (err) Errorthrow(res, err);
        res.json({
          pinfo: row
        });
        connection.release();
      }
    );
  });
});

module.exports = router;
