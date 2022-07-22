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

router.post("/add_employee", function (request, response) {
  var form = new formidable.IncomingForm();
  //console.log(form);
  form.parse(request, function (err, fields, files) {
    if (err) {
      // Check for and handle any errors here.

      console.error(err.message);
      return;
    }
    //console.log("Moving File");
    //console.log(files.photo.path);
    //console.log(fields.uid);
    mv(
      files.photo.path,
      process.cwd() + "/images/" + fields.uid + ".png",
      function (err) {
        if (err) throw err;
      }
    );
    var imagename = fields.uid + ".png";
    insertquery =
      "insert into employee(uid,name,email,gender,designation,dept,mobile,photo) values (?,?,?,?,?,?,?,?);";
   // console.log("Adding Employee");
    var connection = getMySQLConnection();
    connection.connect();
    connection.query(
      insertquery,
      [
        fields.uid,
        fields.name,
        fields.email,
        fields.gender,
        fields.designation,
        fields.dept,
        fields.mobile,
        imagename,
      ],
      function (err, rows, fields) {
        if (err) {
          console.log(err);

          //if (err.errno == 1062) {
          // request.flash('messages', 'The employee record already exist.'); //we send the flash msg
          //response.render("home");
          //db.end();
          // }
          // else {
          throw err;

          //}
        } else {
          response.writeHead(200, { "content-type": "text/plain" });
          response.write("Employee Added Sucessfully\n\n");
          response.end();
        }
      }
    );
    connection.end();
  });
});
module.exports = router;
