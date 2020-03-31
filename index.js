const express = require('express');
const search = require('./routes/searchRoute');
const mongoose = require('mongoose');

process.env.MONGODB_URI

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app = express();

app.use('/search', search);

module.exports = app;