const http = require('http');
const request = require('request');
const express = require('express');
const cloudscraper = require('cloudscraper');
app = express();

app.get('/', (req, res, err) => {
    cloudscraper.get('https://www.wikipedia.org')
    .then(response => {
        res.set(200).json({
            message: response
        });
    });
});

module.exports = app;