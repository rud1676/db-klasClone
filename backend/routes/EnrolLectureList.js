var db = require("../db.js");
var express = require("express");
var router = express.Router();

const Errorthrow = (res, err) => {
  res.json({
    success: false
  });
  throw err;
};

router.get("/", (req, res) => {
  db.getConnection((err, connection) => {
    if (err) Errorthrow(res, err);
    connection.query("select * from lecture", (err, row) => {
      if (err) Errorthrow(res, err);
      res.json({
        lectures: row
      });
      connection.release();
    });
  });
});

module.exports = router;
