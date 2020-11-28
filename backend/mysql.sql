SET SESSION FOREIGN_KEY_CHECKS=0;

/* Drop Tables */

DROP TABLE IF EXISTS professor_in_lecture;
DROP TABLE IF EXISTS student_lecture;
DROP TABLE IF EXISTS topic_notice;
DROP TABLE IF EXISTS lecture;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS professor;
DROP TABLE IF EXISTS department;




/* Create Tables */

CREATE TABLE department
(
	d_code char(3) NOT NULL,
	d_name varchar(30) NOT NULL,
	d_tel_no varchar(13) NOT NULL,
	PRIMARY KEY (d_code),
	UNIQUE (d_name),
	UNIQUE (d_tel_no)
);


CREATE TABLE lecture
(
	lecture_code char(14) NOT NULL,
	lecture_name varchar(30) NOT NULL,
	point int(1) NOT NULL,
	lecture_semester char(3) NOT NULL,
	lecture_classification char(4) NOT NULL,
	d_code char(3) NOT NULL,
	PRIMARY KEY (lecture_code)
);


CREATE TABLE professor
(
	p_id char(10) NOT NULL,
	p_name varchar(20) NOT NULL,
	p_prime_no char(14) NOT NULL,
	p_sex char(1) NOT NULL,
	p_tel_no char(13),
	p_e_mail varchar(30),
	d_code char(3) NOT NULL,
	PRIMARY KEY (p_id),
	UNIQUE (p_prime_no),
	UNIQUE (p_e_mail)
);


CREATE TABLE professor_in_lecture
(
	p_id char(10) NOT NULL,
	lecture_code char(14) NOT NULL,
	lecture_time_1 char(3) NOT NULL,
	lecture_time_2 char(3),
	lecture_room varchar(20) NOT NULL
);


CREATE TABLE student
(
	s_id char(10) NOT NULL,
	s_password varchar(100) DEFAULT 'undefined' NOT NULL,
	s_name varchar(20) NOT NULL,
	s_prime_no char(14) NOT NULL,
	s_sex char(1) NOT NULL,
	grade int(1) NOT NULL,
	s_tel_no char(13),
	s_e_mail varchar(30),
	p_id char(10) NOT NULL,
	d_code char(3) NOT NULL,
	PRIMARY KEY (s_id),
	UNIQUE (s_prime_no),
	UNIQUE (s_e_mail)
);


CREATE TABLE student_lecture
(
	s_id char(10) NOT NULL,
	lecture_code char(14) NOT NULL,
	score char(2),
	class_semester char(6) NOT NULL
);


CREATE TABLE topic_notice
(
	notice_no int unsigned NOT NULL AUTO_INCREMENT,
	notice_title varchar(50) NOT NULL,
	notice_description text NOT NULL,
	notice_create date NOT NULL,
	notice_count int unsigned DEFAULT 0 NOT NULL,
	p_id char(10) NOT NULL,
	lecture_code char(14) NOT NULL,
	PRIMARY KEY (notice_no)
);



/* Create Foreign Keys */

ALTER TABLE lecture
	ADD FOREIGN KEY (d_code)
	REFERENCES department (d_code)
	ON UPDATE CASCADE
	ON DELETE SET NULL
;


ALTER TABLE professor
	ADD FOREIGN KEY (d_code)
	REFERENCES department (d_code)
	ON UPDATE CASCADE
	ON DELETE SET NULL
;


ALTER TABLE student
	ADD FOREIGN KEY (d_code)
	REFERENCES department (d_code)
	ON UPDATE CASCADE
	ON DELETE SET NULL
;


ALTER TABLE professor_in_lecture
	ADD FOREIGN KEY (lecture_code)
	REFERENCES lecture (lecture_code)
	ON UPDATE CASCADE
	ON DELETE SET NULL
;


ALTER TABLE student_lecture
	ADD FOREIGN KEY (lecture_code)
	REFERENCES lecture (lecture_code)
	ON UPDATE CASCADE
	ON DELETE SET NULL
;


ALTER TABLE topic_notice
	ADD FOREIGN KEY (lecture_code)
	REFERENCES lecture (lecture_code)
	ON UPDATE CASCADE
	ON DELETE SET NULL
;


ALTER TABLE professor_in_lecture
	ADD FOREIGN KEY (p_id)
	REFERENCES professor (p_id)
	ON UPDATE CASCADE
	ON DELETE SET NULL
;


ALTER TABLE student
	ADD FOREIGN KEY (p_id)
	REFERENCES professor (p_id)
	ON UPDATE CASCADE
	ON DELETE SET NULL
;


ALTER TABLE topic_notice
	ADD FOREIGN KEY (p_id)
	REFERENCES professor (p_id)
	ON UPDATE CASCADE
	ON DELETE SET NULL
;


ALTER TABLE student_lecture
	ADD FOREIGN KEY (s_id)
	REFERENCES student (s_id)
	ON UPDATE CASCADE
	ON DELETE SET NULL
;

insert into student(s_id, s_name, s_prime_no, s_sex, grade, s_tel_no, s_e_mail, p_id, d_code)
values("2016722048","이치윤", "960606", "M", 3, "010-3642-9567", "aaa@naver.com", "11111111", "001");

insert into department(d_code, d_name, d_tel_no)
values("001", "컴퓨터공학과", "02-1111-1111"),
("002", "소프트웨어공학과", "02-1111-1114"),
("003", "정보융합공학과", "02-1111-1115"),
("004", "전자공학과", "02-1111-1112"),
("005", "전기공학과", "02-1111-1113");

insert into professor(p_id, p_name, p_prime_no, p_sex, p_tel_no, p_e_mail, d_code)
values("11111111", "황호영", "800808", "M", "010-1111-1111", "AAA@naver.com", "001"),
("22222222", "이기훈", "790101", "M", "010-2222-2222", "BBB@naver.com", "001"),
("33333333", "김태석", "780101", "M", "010-3333-3333", "CCC@naver.com", "001"),
("44444444", "이혁준", "770101", "M", "010-4444-4444", "DDD@naver.com", "001");


insert into lecture(lecture_code, lecture_name, point, lecture_semester, lecture_classification, d_code)
values ("H020-4-4181-01", "데이터베이스및응용", 3, "4-2", "전선", "001"),
("H020-3-8994-01", "소프트웨어프로젝트2", 3, "3-2", "전선", "001"),
("H020-3-4534-01", "데이터통신", 3, "3-2", "전선", "001"),
("H020-3-1110-01", "운영체제", 3, "3-2", "전필", "001"),
("H020-3-0969-01", "알고리즘", 3, "3-2", "전선", "001");


insert into professor_in_lecture(p_id, lecture_code, lecture_time_1, lecture_time_2, lecture_room)
values ("11111111", "H020-3-4534-01", "목-3", "목-4", "새빛관 201"),
("11111111", "H020-3-0969-01", "금-3", "금-4", "새빛관 201"),
("22222222", "H020-4-4181-01", "월-6", "수-5", "새빛관 202"),
("44444444", "H020-3-8994-01", "월-4", "수-3", "새빛관 301"),
("33333333", "H020-3-1110-01", "월-1", "수-2", "새빛관 401");


insert into student_lecture(s_id, lecture_code, score, class_semester)
values ("2016722048", "H020-4-4181-01", "A", "2020-2"),
("2016722048", "H020-3-8994-01", "A", "2020-2"),
("2016722048", "H020-3-4534-01", "B", "2020-2"),
("2016722048", "H020-3-1110-01", "B", "2020-2"),
("2016722048", "H020-3-0969-01", "C", "2020-2");


insert into topic_notice(notice_title, notice_description, notice_create, p_id, lecture_code)
values ("공지1", "내용 없음", "2020-11-26", "11111111", "H020-3-4534-01");







