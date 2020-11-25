//로그인 버튼 눌렀을때 학번 패스워드 조회 코드
var db = require("../db.js");

router.post("/", (req, res) => {
  const user = {
    userid: req.body.user.userid,
    password: req.body.user.password
  };
  db.query(
    'SELECT userid, password FROM users WHERE userid = "' + user.userid + '"',
    (err, row) => {
      if (err) {
        res.json({
          message:
            "학번이 존재하지 않습니다. 확인해보시거나 관리처로 전화하여 주십시요..",
          success: false
        });
      }
      if (row[0] != undefined && row[0].student_id == user.userid) return;
    }
  );
});
