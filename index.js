const express = require('express');
const search = require('./routes/searchRoute');
const mongoose = require('mongoose');

url = process.env.MONGODB_URI || "mongodb+srv://qharo:qharo1@comichub-gxa1c.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app = express();

app.use('/search', search);

module.exports = app;