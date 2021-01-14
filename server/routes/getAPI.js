var express = require('express');
var router = express.Router();
const path = require("path");
const multer = require("multer");
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const AddAssignment = require('../models/add_assignment');
const fs = require('fs');

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
})

var upload = multer({ storage: storage });

router.get('/', function (req, res, next) {
    AddAssignment.find({}, function (err, assignment) {
    if(err){
      console.log(err);
      res.send("false");
      return;
    }
    else{
      console.log(assignment);
      res.send(assignment);
    }
  })
});

// var upload = multer();

router.post('/create', function(req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json(err)
    }
    console.log(req.file);
    return res.send(req.file);
  })
});

router.post('/student-login', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  Student.findOne({email: email}, function (err, student) {
    if(err){console.log(err);}
    else{
      if(student){
        console.log(password);
        console.log('s',student,'s');
        if(student.password === password){
          console.log("trueeeee");
          res.send(true);
        }else{
          console.log("falseeeee");
          res.send(false);
        }
      }else{
        res.send(false);
      }
    }
  })
});

router.post('/teacher-login', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  Teacher.findOne({email: email}, function (err, teacher) {
    if(err){console.log(err);}
    else{
      if(teacher){
        console.log(password);
        console.log('s',teacher,'s');
        if(teacher.password === password){
          console.log("trueeeee");
          res.send(true);
        }else{
          console.log("falseeeee");
          res.send(false);
        }
      }else{
        res.send(false);
      }
    }
  })
});

router.post('/create-student', function(req, res) {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const newStudent = new Student({
    email: email,
    password: password,
    name: name
  });
  newStudent.save(function (err) {
    if(err){console.log(err); }
    else{

      res.send("successful insert");
    }
  })
});

router.post('/create-teacher', function(req, res) {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const newTeacher = new Teacher({
    email: email,
    password: password,
    name: name
  });
  newTeacher.save(function (err) {
    if(err){console.log(err); }
    else{
      res.send("successful insert teacher");
    }
  })
});

router.post('/add-assignments', upload.single('file'), function(req, res) {
  console.log('133', path.join(__dirname));
  // try {
  //   fileContents = fs.readFileSync(path.join(__dirname, '../', '/public/files/' + req.file.filename), {encoding:'utf8', flag:'r'});
  // } catch (err) {
  //   console.log('136', err);
  // }
  const newAssignment = new AddAssignment({
    // pdf: {
    //   data: fs.readFileSync(path.join(__dirname, '../', '/public/files/' + req.file.filename)),
    //   contentType: 'application/pdf'
    // },
    pdf: req.file.filename,
    title: req.body.data
  });
  newAssignment.save(function (err, file) {
    if(err){console.log(err); }
    else{
      console.log("successful insert assignment", file);
    }
  })
  res.send(false);
});

router.get('/get-assignments', function(req, res) {
  AddAssignment.find({}, function (err, assignment) {
    if(err){
      console.log(err);
      res.send("false");
      return;
    }
    else{
      console.log(assignment);
      res.send(assignment);
    }
  })
});


module.exports = router;