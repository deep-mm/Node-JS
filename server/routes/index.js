const express = require('express');
const router = express.Router();
const path = require('path');
var logger = require('./authentication');
const multer = require('multer');
var fs = require('fs');
const readline = require('readline');
const urlToCheck = '/Users/deepmehta/Deep/Projects/GITHUB/Web Development/Node JS/public/textFile.txt';
const url = '/Users/deepmehta/Deep/Projects/GITHUB/Web Development/Node JS/';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
   
var upload = multer({ storage: storage });

//Checking File Permissions
fs.access(urlToCheck, fs.constants.R_OK, (err) => {
    if (err) {
        console.log("%s can't read", urlToCheck);
    } else {
        console.log('can read %s', urlToCheck);
    }
});

//Reading file
var str = '';
var linescount = 0;
var lineReader = readline.createInterface({
    input: fs.createReadStream(urlToCheck)
});
      
lineReader.on('line', function (line) {
    linescount++;
    console.log('Line from file:', line);
    str = str + line;
    str = str + '\n';
});

router.get('/',function(req,res){
    res.sendFile(path.join(url+'public/index.html'));
});

router.get('/passArguments',function(req,res){
    data = {name: 'Deep', age: 22};
    res.sendFile(path.join(url+'public/index.html'),data);
});

router.get('/settingCookie', function(req,res){
    res.cookie('name', 'express').send('cookie set');
});

router.get('/checkingCookies', function(req,res){
    console.log('Cookies: ', req.cookies);
    res.send(req.cookies);
});

router.get('/file',function(req,res){
    res.send('Number = '+linescount + '\n Lines = \n'+str);
});

router.get('/authenticate/:email',function(req,res){
    var email = req.params.email;
    if(logger.authenticate(email)){
        res.send('Authentication Success');
    }
    else{
        res.send('Authentication Failed');
    }
});

router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400;
      return next(error)
    }
      res.send(file)
    
});

router.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files;
    if (!files) {
      const error = new Error('Please choose files');
      error.httpStatusCode = 400;
      return next(error)
    }
   
      res.send(files)
    
});

router.get('*', (req, res) => {
    res.send('Error 404, Page not found');
});

module.exports = router;
