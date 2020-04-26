const express = require('express');
var app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/account', (req, res) => {
    res.send('the account page');
});

app.post('/signup', (req, res) => {
    let content = req.body;
    console.log(content);
});

app.listen(PORT, () => {
    console.log('listening on ' + PORT);
});