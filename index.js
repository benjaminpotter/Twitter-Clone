const express = require('express');
const bodyParser = require('body-parser');
var app = express();

const PORT = 3001;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var users = {};
  
app.post('/signup', (req, res, next) => {
    const responseBody = { err: false, msg: '' };
    let data = req.body;

    if (users[data.username] != undefined){
        responseBody.err = true;
        responseBody.msg = 'Username already exists!';
    } else {
        users[req.body.username] = req.body.password;
        console.log(users);
    }

    res.send(JSON.stringify(responseBody));
});

app.post('/login', (req, res, next) => {
    const responseBody = { err: true, msg: '' };
    let data = req.body;

    if (users[data.username] === data.password){
        responseBody.err = false;
        responseBody.msg = '';
    }

    res.send(JSON.stringify(responseBody));
});

app.listen(PORT);