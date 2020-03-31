const mongoose = require('mongoose');

const comicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    issue: Number,
    year: Number,
    date: String, 
    downloadLink: String,

});

module.exports = mongoose.model('Comic', comicSchema);