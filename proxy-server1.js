const express = require('express');
const bodyParser = require('body-parser');
const port = 3001;

const app = express();

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});