const http = require('http');
const express = require('express');
const cloudscraper = require('cloudscraper');
app = express();

app.get('/', (req, res, err) => {
    let response = cloudscraper.get('www.wikipedia.org')
    .then(res => {
        res.set(200).json({
            message: 'this should work with Heroku'
        });
    });
});

module.exports = app;