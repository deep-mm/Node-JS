const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require("../models/student");
const path = require('path');

const url = "mongodb://localhost:27017/students";
mongoose.Promise = global.Promise;

mongoose.connect(url,function(err,db){
    if(err){
        console.log("Error "+err);
    }
    else{
        console.log("Connected on url "+url);
    }
});

router.get('/',function(req,res){
    res.send('Api Works');
});

router.get('/getObjects', function(req,res){
    object = {name: 'Deep', age: '22', mobile: '9999999999'};
    res.json(object);
});

router.post('/student', function(req,res){
    console.log("Posting a document");
    var newStudent = new Student();
    newStudent.name = req.body.name;
    newStudent.age = req.body.age;
    newStudent.college = req.body.college;
    console.log(req.body.name);
    newStudent.save(function(err, insertedDoc){
        if(err){
            console.log("Error "+err);
        }
        else{
            res.json(insertedDoc);
        }
    })
});

router.get('/students',function(req,res){
    console.log('Get request for all students');
    Student.find({})
    .exec(function(err, students){
        if(err){
            console.log("Error "+err);
        }
        else{
            res.json(students);
        } 
    });
});

router.get('/student/:id',function(req,res){
    console.log('Get request for a single student');
    const id = req.params.id;
    Student.findById(id)
    .exec(function(err, student){
        if(err){
            console.log("Error "+err);
        }
        else{
            res.json(student);
        } 
    });
});

router.put('/students/:id',function(req,res){
    console.log('Update a student');
    const id = req.params.id;
    Student.findByIdAndUpdate(id, {
        $set: {name:req.body.name, age: req.body.age, college: req.body.description}
    },
    {
        new: true
    },
    function(err,updateDoc){
        if(err){
            console.log("Error "+err);
        }
        else{
            res.json(updateDoc);
        }
    })
});

router.delete('/student/:id',function(req,res){
    console.log('Delete a single student');
    const id = req.params.id;
    Student.findByIdAndDelete(id, function(err,deletedDoc){
        if(err){
            console.log("Error "+err);
        }
        else{
            res.json(deletedDoc);
        }
    })
});

module.exports = router;
