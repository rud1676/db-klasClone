var db = require("../db.js");
var express = require("express");
var router = express.Router();

const Errorthrow = (res, err) => {
  res.json({
    success: false
  });
  throw err;
};
router.post("/noticelist", (req, res) => {
  const stdid = req.body.stdid;
  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    connection.query(
      "select l.lecture_name, n.notice_title, n.notice_description, n.notice_create from student_lecture as s join lecture as l on s.lecture_code = l.lecture_code join topic_notice as n on l.lecture_code = n.lecture_code where s.s_id = " +
        stdid +
        " order by n.notice_create desc",
      (err, row) => {
        if (err) Errorthrow(res, err);
        res.json({
          notices: row
        });
        connection.release();
      }
    );
  });
});
router.post("/lecturelist", (req, res) => {
  const stdid = req.body.stdid;
  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    connection.query(
      "select lecture_code, lecture_name, p_name from v_student_Lecture_info where s_id = '" +
        stdid +
        "' and class_semester='2020-2'",
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
