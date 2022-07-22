const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
var formidable = require("formidable");
const mysql = require("mysql");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var util = require("util");
var fs = require("fs");
var mv = require("mv");
var path = require("path");
function getMySQLConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kelvin",
  });
}

router.post("/search_id", function (req, res) {
  var response = {
    date_input: req.body.search_id,
  };
  //console.log("search id" + " " + response);
  req.session.context = req.body.search_id;
  res.redirect("/search");
  res.end(JSON.stringify(response));
});
router.get("/search", function (req, res) {
  var search_id = req.session.context;
  search_input = Number(search_id);
  //console.log(search_input);
  //console.log(search_id);
  var personList = [];

  var connection = getMySQLConnection();
  connection.connect();
  var l = [
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
  ];
  c = 0;
  for (i = 0; i < l.length; i++) {
    c = c + 1;
  }
  //console.log(c);
  connection.query(
    "select * from temp_jan where uid=? union select * from temp_feb  where uid=? union select * from temp_mar where uid=? union select * from temp_apr where uid=? union select * from temp_may where uid=? union select * from temp_jun where uid=? union  select * from temp_jul where uid=? union select * from temp_aug where uid=? union select * from  temp_sep where uid=? union select * from temp_oct where uid=? union select * from temp_nov where uid=? union select * from temp_dec where uid=? order by time;",
    [
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
    ],
    function (err, rows, fields) {
      //connection.query("(select * from temp_jan where uid=?) union (select * from temp_feb where uid=?)",[search_input,search_input], function (err, rows, fields) {

      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        for (var i = 0; i < rows.length; i++) {
          var t = rows[i].time;
          var str = t.toString();
          var s = str.split(" ", 5);
          var day = s[0];
          var month = s[1];
          var date = s[2];

          //console.log(s);

          var person = {
            uid: rows[i].uid,
            email: rows[i].email,
            time: s,
            temperature: rows[i].temperature,
            distance: rows[i].distance,
            shift: rows[i].shift,
          };

          personList.push(person);
          //console.log(personList);
        }
        //	res.end(JSON.stringify(personList));
        //res.end(personList);
        res.render("filter", {
          result: true,
          personList: personList,
        });
      }
    }
  );

  connection.end();
});

module.exports = router;
