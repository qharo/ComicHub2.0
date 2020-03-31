const express = require('express');
const search = require('./routes/searchRoute');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://qharo:qharo1@comichub-gxa1c.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app = express();

app.use('/search', search);

module.exports = app;