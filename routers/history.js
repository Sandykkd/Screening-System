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


router.post("/history", function (req, res) {
    res.redirect("/employee/entire");
   });
   
   router.get("/employee/entire", function (req, res) {
     var personList = [];
   
     var connection = getMySQLConnection();
     connection.connect();
   
     connection.query(
       "select * from temp_jan union select * from temp_feb union select * from temp_mar union select * from temp_apr union select * from temp_may union select * from temp_jun union  select * from temp_jul union select * from temp_aug union select * from temp_sep union select * from temp_oct union select * from temp_nov union select * from temp_dec order by time;;",
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
           res.render("index", {
             personList: personList,
           });
         }
       }
     );
     connection.end();
   });
   

module.exports = router;
