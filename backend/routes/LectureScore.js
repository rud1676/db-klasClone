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
      "select l.lecture_code, l.lecture_name, s.score, s.class_semester, l.lecture_classification, p.p_name from student_lecture as s inner join lecture as l on l.lecture_code = s.lecture_code inner join professor as p on l.p_id = p.p_id where s.s_id = '" +
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
/*
//router 이름은 /Score로 임시로 적어놓음
router.post("/", (req, res) => {
  const stdid = req.body.stdid;
  db.getConnection((err, connection) => {
    var sql_student = `select D.d_name, S.s_id, S.s_name, S.grade, P.p_name 
        from student as S, department as D, professor as P
        where S.s_id = ${stdid} and S.p_id = P.p_id and S.d_code = D.d_code;`;

    //class_semester가 첫 번째 인자로 오게끔 설정
    var sql_score = `select S_L.class_semester, S_L.lecture_code, L.lecture_name, D.d_name, L.lecture_classification, L.point, S_L.score
        from lecture as L, department as D, student_lecture as S_L
        where L.lecture_code = S_L.lecture_code and S_L.s_id = ${stdid} and L.d_code = D.d_code;`;

    //application_major : 신청 전공 학점, application_normal : 신청 일반 학점, application_sum : 신청 학점 합계
    var application_major = `select sum(L.point)
        from student_lecture as S_L inner join lecture as L on S_L.lecture_code = L.lecture_code
        where S_L.s_id = ${stdid}
        and L.point in (select point from lecture where L.lecture_classification like "전%")`;

    var application_normal = `select sum(L.point)
        from student_lecture as S_L inner join lecture as L on S_L.lecture_code = L.lecture_code
        where S_L.s_id = ${stdid}
        and L.point not in (select point from lecture where L.lecture_classification like "전%")`;

    var application_sum = `select sum(L.point)
        from student_lecture as S_L inner join lecture as L on S_L.lecture_code = L.lecture_code
        where S_L.s_id = ${stdid}`;

    var not_exists_F = `not exists (select score from student_lecture where score = "F");`;

    //Acquisition_major : 취득 전공 학점, Acquisition_normal : 취득 일반 학점, Acquisition_sum : 취득 학점 합계
    var Acquisition_major = `${application_major} and ${not_exists_F}`;
    var Acquisition_normal = `${application_normal} and ${not_exists_F}`;
    var Acquisition_sum = `${application_sum} and ${not_exists_F}`;

    //application_gpa : 학적부 기준 평균, Acquisition_gpa : 성적증명서 기준 평균
    var application_gpa = `select SUM((case S_L.score when "A+" then 4.5 
                                                when "A" then 4
                                                when "B+" then 3.5
                                                when "B" then 3
                                                when "C+" then 2.5
                                                when "C" then 2
                                                when "D+" then 1.5
                                                when "F" then 0 end)*L.point)/SUM(L.point) as GPA
                                from student_lecture as S_L, lecture as L
                                where S_L.s_id = ${stdid} and S_L.lecture_code = L.lecture_code`;
    var Acquisition_gpa = `${application_gpa} and ${not_exists_F}`;

    application_major += ";";
    application_normal += ";";
    application_sum += ";";
    application_gpa += ";";

    connection.query(
      sql_student +
        sql_score +
        application_major +
        application_normal +
        application_sum +
        Acquisition_major +
        Acquisition_normal +
        Acquisition_sum +
        application_gpa +
        Acquisition_gpa,
      function (err, results, field) {
        //s_info : 학생 정보, score_info : 성적 내역 정보
        var s_info = results[0];
        var score_info = results[1];

        //ap : 신청, aq : 취득, major : 전공, normal : 일반, sum : 합계, gpa : 평균
        var ap_major = results[2];
        var ap_normal = results[3];
        var ap_sum = results[4];

        var aq_major = results[5];
        var aq_normal = results[6];
        var aq_sum = results[7];

        var ap_gpa = results[8];
        var aq_gpa = results[9];

        if (err) throw err;
        else {
          //node js console log 확인해 봤는데 잘나옴
          console.log("rows : " + JSON.stringify(s_info));
          console.log("rows : " + JSON.stringify(score_info));
          console.log("rows : " + JSON.stringify(ap_major));
          console.log("rows : " + JSON.stringify(ap_normal));
          console.log("rows : " + JSON.stringify(ap_sum));
          console.log("rows : " + JSON.stringify(aq_major));
          console.log("rows : " + JSON.stringify(aq_normal));
          console.log("rows : " + JSON.stringify(aq_sum));
          console.log("rows : " + JSON.stringify(ap_gpa));
          console.log("rows : " + JSON.stringify(aq_gpa));
        }

        res.json({
          s_info: s_info[0],
          score_info: score_info[0],
          ap_major: ap_major[0],
          ap_normal: ap_normal[0],
          ap_sum: ap_sum[0],
          aq_major: aq_major[0],
          aq_normal: aq_normal[0],
          aq_sum: aq_sum[0],
          ap_gpa: ap_gpa[0],
          aq_gpa: aq_gpa[0]
        });

        connection.release();
      }
    );
  });
});
*/
module.exports = router;
