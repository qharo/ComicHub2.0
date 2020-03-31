const cheerio = require('cheerio');
const cloudscraper = require('cloudscraper');
const helper = require('../helper');

function getSpecificComic(url) {
    return cloudscraper.get(url).then((res) => {
        let comic = {};
        $ = cheerio.load(res);
        title = $('h1.post-title').text();
        date = $('li.post-date > a > time').text();
        comic = helper['stringDivide'](title);
        comic['date'] = helper['getComicDateConverter'](date);
        comic['downloadLink'] = $('div.aio-pulse > a').attr().href;
        return comic;
    }, err => {
        console.log("There is an error");
    });
}

module.exports = getSpecificComic;