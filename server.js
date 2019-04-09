const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cookieParser = require('cookie-parser');
var httpProxy = require('http-proxy');
const middleware = require('./server/routes/middleware');
var apiProxy = httpProxy.createProxyServer();
var standard_input = process.stdin;
standard_input.setEncoding('utf-8');

const app = express();

var serverOne = 'http://localhost:3001',
    ServerTwo = 'http://localhost:3002';

app.all("/app1/*", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: serverOne});
});

app.all("/app2/*", function(req, res) {
    console.log('redirecting to Server2');
    apiProxy.web(req, res, {target: ServerTwo});
});

const api = require('./server/routes/api');
const index = require('./server/routes/index');
const port = 3000;

//app.use(middleware);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use(cookieParser())

console.log("Please input text in command line.");

standard_input.on('data', function (data) {

    if(data === 'exit\n'){
        console.log("User input complete, program exit.");
        process.exit();
    }else
    {
        console.log('User Input Data : ' + data);
    }
});

app.use('/api', api);
app.use('/',index);

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});