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


router.post("/search_dept", function (req, res) {
  var response = {
    date_input: req.body.search_dept,
  };

  //console.log("search drop" + " " + req.body.search_dept);
  req.session.context = req.body.search_dept;
  res.redirect("/search_dept1");
  res.end(JSON.stringify(response));
});

router.get("/search_dept1", function (req, res) {
  var search_input = req.session.context;
  //search_input  = Number(search_email);
 // console.log("type" + " " + typeof search_input);
  //	console.log(search_id);
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
  var sql =
    "(select temp_jan.uid,employee.email,temp_jan.time, temp_jan.temperature, temp_jan.distance, temp_jan.shift  from temp_jan,employee  where temp_jan.email=employee.email and dept=?) union (select temp_feb.uid,employee.email,temp_feb.time, temp_feb.temperature, temp_feb.distance, temp_feb.shift  from temp_feb,employee  where temp_feb.email=employee.email and dept=?) union (select temp_mar.uid,employee.email,temp_mar.time, temp_mar.temperature, temp_mar.distance, temp_mar.shift  from temp_mar,employee  where temp_mar.email=employee.email and dept=?) union (select temp_apr.uid,employee.email,temp_apr.time, temp_apr.temperature, temp_apr.distance, temp_apr.shift  from temp_apr,employee  where temp_apr.email=employee.email and dept=?) union (select temp_may.uid,employee.email,temp_may.time, temp_may.temperature, temp_may.distance, temp_may.shift  from temp_may,employee  where temp_may.email=employee.email and dept=?) union (select temp_jun.uid,employee.email,temp_jun.time, temp_jun.temperature, temp_jun.distance, temp_jun.shift  from temp_jun,employee  where temp_jun.email=employee.email and dept=?) union (select temp_jul.uid,employee.email,temp_jul.time, temp_jul.temperature, temp_jul.distance, temp_jul.shift  from temp_jul,employee  where temp_jul.email=employee.email and dept=?) union (select temp_aug.uid,employee.email,temp_aug.time, temp_aug.temperature, temp_aug.distance, temp_aug.shift  from temp_aug,employee  where temp_aug.email=employee.email and dept=?) union  (select temp_sep.uid,employee.email,temp_sep.time, temp_sep.temperature, temp_sep.distance, temp_sep.shift  from temp_sep,employee  where temp_sep.email=employee.email and dept=?) union (select temp_oct.uid,employee.email,temp_oct.time, temp_oct.temperature, temp_oct.distance, temp_oct.shift  from temp_oct,employee  where temp_oct.email=employee.email and dept=?) union (select temp_nov.uid,employee.email,temp_nov.time, temp_nov.temperature, temp_nov.distance, temp_nov.shift  from temp_nov,employee  where temp_nov.email=employee.email and dept=?) union (select temp_dec.uid,employee.email,temp_dec.time, temp_dec.temperature, temp_dec.distance, temp_dec.shift  from temp_dec,employee  where temp_dec.email=employee.email and dept=?)";
  //connection.query("select * from temp_jan where email=? union select * from temp_feb  where email=? union select * from temp_mar where email=? union select * from temp_apr where email=? union select * from temp_may where email=? union select * from temp_jun where email=? union  select * from temp_jul where email=? union select * from temp_aug where email=? union select * from  temp_sep where email=? union select * from temp_oct where email=? union select * from temp_nov where email=? union select * from temp_dec where email=? order by time;", [search_input, search_input, search_input, search_input, search_input, search_input, search_input, search_input, search_input, search_input, search_input, search_input], function (err, rows, fields) {

  connection.query(
    sql,
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
          result:true,
          personList: personList,
        });
      }
    }
  );

  connection.end();
});

  

module.exports = router;
