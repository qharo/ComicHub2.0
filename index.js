const http = require('http');
const express = require('express');
app = express();

app.get('/', (req, res, err) => {
    res.set(200).json({
        message: 'this should work with Heroku'
    })
});

module.exports = app;