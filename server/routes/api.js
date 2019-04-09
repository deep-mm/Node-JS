const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/',function(req,res){
    res.send('Api Works');
});

router.get('/getObjects', function(req,res){
    object = {name: 'Deep', age: '22', mobile: '9999999999'};
    res.json(object);
});

module.exports = router;