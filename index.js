const http = require('http');
const express = require('express');
app = express();

app.get('/', (req, res, err) => {
    res.set(200).json({
        message: 'this is working'
    })
});

module.exports = app;