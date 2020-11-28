//connection 생성 함수를 재가용성을 위해 하나의 파일로 정의
//mysql 연동 - connection 객체 생성
var mysql = require("mysql");
var db = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "kw"
});
// Connect
module.exports = db;
