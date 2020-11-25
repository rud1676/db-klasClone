//로그인 버튼 눌렀을때 학번 패스워드 조회 코드
var bcrypt = require("bcrypt-nodejs");
var db = require("../db.js");
var express = require("express");
var router = express.Router();
//에러 처리에 관한 함수
const Errorthrow = (res, err) => {
  res.json({
    message: "서버 에러입니다 관리자에게 문의해주십시요...",
    success: false
  });
  throw err;
};

//비밀번호 등록하는 과정
router.post("/regist", (req, res) => {
  const user = {
    stdid: req.body.user.std,
    ssn: req.body.user.ssn,
    pass: req.body.user.pass
  };
  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    bcrypt.hash(user.pass, null, null, (err, encryptedPassword) => {
      connection.query(
        'UPDATE student SET password = "' +
          encryptedPassword +
          '" WHERE student_id = ' +
          user.stdid,
        (err, row) => {
          if (err) Errorthrow(res, err);
          res.json({
            success: true,
            message: "비밀번호 등록 성공!"
          });
          console.log(user);
          connection.release();
        }
      );
    });
  });
});
//비밀번호 최조등록할때 신원이 확인되고 비밀번호 등록할때 사용하는 api
router.post("/registcheck", (req, res) => {
  const user = {
    stdid: req.body.user.std,
    ssn: req.body.user.ssn
  };
  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    connection.query(
      "SELECT student_id, password,ssn FROM student WHERE student_id = " +
        user.stdid +
        ' and ssn = "' +
        user.ssn +
        '"',
      (err, row) => {
        if (err) Errorthrow(res, err);
        if (row[0] == undefined) {
          res.json({
            message:
              "주민번호랑 매치되는 학번이 존재하지 않습니다. 확인해보시거나 관리처로 전화하여 주십시요..",
            success: false
          });
        } else if (
          row[0] != undefined &&
          row[0].student_id == user.stdid &&
          row[0].ssn == user.ssn &&
          row[0].password == "undefined"
        ) {
          res.json({
            success: true,
            message: "테스트"
          });
        } else {
          console.log(row, user);
          res.json({
            success: false,
            message:
              "서버 이상으로 등록을 실패했습니다. 학교 관리자에게 문의해주십시오..."
          });
        }
        connection.release();
      }
    );
  });
});
//해쉬로 처리된 비밀번호값을 비교하는 함수 -> 일치하면 regist하게끔 changepassword.vue에서 유도
router.post("/usercheck", (req, res) => {
  const user = {
    stdid: req.body.user.std,
    checkpass: req.body.user.checkpass
  };
  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    connection.query(
      "SELECT student_id, password FROM student WHERE student_id = " +
        user.stdid,
      (err, row) => {
        if (err) Errorthrow(res, err);
        if (row[0] == undefined) {
          res.json({
            message:
              "학번이 존재하지 않습니다. 확인해보시거나 관리처로 전화하여 주십시요..",
            success: false
          });
          connection.release();
          return;
        }
        bcrypt.compare(user.checkpass, row[0].password, (err, check) => {
          if (check) {
            res.json({
              message: "미션... 성공!",
              success: true
            });
          } else {
            res.json({
              message: "비밀번호가 다릅니다 확인해주세요",
              success: false
            });
          }
        });
        connection.release();
        console.log(user, row);
      }
    );
  });
});
module.exports = router;
