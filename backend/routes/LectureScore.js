var db = require("../db.js");
var express = require("express");
var router = express.Router();

const Errorthrow = (res, err) => {
  res.json({
    success: false
  });
  throw err;
};
router.post("/", (req, res) => {
  const stdid = req.body.stdid;
  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    connection.query(
      "select lecture_code, lecture_name, score, class_semester, lecture_classification, p_name from v_student_Lecture_info where s_id = '" +
        stdid +
        "'",
      (err, row) => {
        if (err) Errorthrow(res, err);
        res.json({
          lectures: row
        });
      }
    );
  });
});
router.post("/gets", (req, res) => {
  const stdid = req.body.stdid;
  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    connection.query(
      "select * from std_all_score where s_id='" + stdid + "'",
      (err, row) => {
        if (err) Errorthrow(res, err);
        res.json({
          socores: row
        });
      }
    );
  });
});
module.exports = router;
