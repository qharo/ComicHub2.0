const express = require('express');
const router = express.Router();
const helper = require('../helper');
const getComics = require('../search/getComics');
const Comic = require('../models/comicSchema');
const mongoose = require('mongoose');

router.get('/:name/:issue/:year', (req, res, next) => {
    
    Comic.find({'name': req.params.name, 'issue': parseInt(req.params.issue), 'year': parseInt(req.params.year)}).exec()
    .then(doc => {
        console.log('Request went through without errors.');
        if(doc.length > 0){
            res.send(doc);
            console.log('Successfully found in server!')
        }
        else{
            console.log('Not found in server.');
            specificSearch(req.params)
            .then(value => {
                res.send(value);
                console.log('Comic found!');
                value._id = mongoose.Types.ObjectId();
                let comic = new Comic(value);
                comic.save().then(result => {
                    console.log('Saved in MongoDB server!');
                    Comic.find().exec()
                    .then(output => {
                        console.log("Current server directory is: ");
                        console.log(output);
                    })
                    .catch(err => {
                        console.log("Error occured in saving to directory");
                        console.log(err);
                    })
                })
            })
            .catch(err => {
                console.log('Error in scraping comci');
                res.send({
                    message: err
                });
            });
        }
    })
    .catch(err => {
        res.send(err);
        console.log('There was an error.');
    });
    
});

router.delete('/', (req, res, next) => {
    Comic.deleteMany().exec()
    .then(() => {
        console.log("Deleted all comics!");
        res.send("Deleted all comics!");
        Comic.find().exec()
        .then(result => {
            console.log("Current database looks like this: ");
            console.log(result);
        })
        .catch(err => {
            console.log('Error while fetching current database');
            console.log(err);
        })
    })
    .catch(err => {
        console.log('Error while deleting');
        console.log(err);
        res.send(err);
    });
});








router.get('/:searchString', (req, res, next) => {
    //check with server
    res.status(200).json(req.params);
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'this is a post request for search',
    });
});

module.exports = router;

function specificSearch(values){
    getComicsUrl = helper['getComicsUrlGenerator'](values);
    console.log(getComicsUrl);
    return getComics(getComicsUrl);
}