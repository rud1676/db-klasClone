//connection 생성 함수를 재가용성을 위해 하나의 파일로 정의
//mysql 연동 - connection 객체 생성
var mysql = require("mysql");
var db = mysql.createPool({
  host: "34.123.115.114",
  port: 3306,
  user: "user1",
  password: "1111",
  database: "kw"
});
// Connect
module.exports = db;
