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

var User = function(username, password) {
    let self = {};
    
    self.username = username;
    self.password = password;

    self.beets = [];

    return self;
};

var users = {
    admin: User('admin', '123')
};
  
app.post('/signup', (req, res, next) => {
    const responseBody = { err: false, msg: '' };
    let data = req.body;

    if (users[data.username] != undefined){
        responseBody.err = true;
        responseBody.msg = 'Username already exists!';
    } else {
        users[data.username] = User(data.username, data.password);
        console.log(users);
    }

    res.send(JSON.stringify(responseBody));
});

app.post('/login', (req, res, next) => {
    const responseBody = { err: true, msg: '' };
    let data = req.body;

    if (users[data.username].password === data.password){
        responseBody.err = false;
        responseBody.msg = '';
    }

    res.send(JSON.stringify(responseBody));
});

app.post('/profile', (req, res, next) => {
    let data = req.body;

    res.send(JSON.stringify(users[data.username]));
});

app.post('/tweet', (req, res, next) => {
    let data = req.body;

    users[data.user.username].beets.push(data.tweet);
    console.log(users[data.user.username].beets);

    res.send(JSON.stringify('Success'));
});

app.listen(PORT);