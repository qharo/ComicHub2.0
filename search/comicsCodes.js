const request = require("request");
const cheerio = require('cheerio');
const cloudscraper = require('cloudscraper');
//const puppeteer = require('puppeteer');
const helper = require('../helper');
//const http = require('https');
//const puppeteer = require('puppeteer-core');
const phantom = require('phantom');

function getSpecificComic(url) {
    return cloudscraper.get(url).then((res) => {
        let comic = {};
        $ = cheerio.load(res);
        const title = $('h1[class = entry-title]').text();
        comic = helper.stringDivide(title);
        const date = $('time.published').text()
        comic['date'] = helper['comicsCodesDateConverter'](date);
        const image = $('img.size-full').attr().src;
        comic['image'] = image;
        const zippyLink = $('div.wrapper > div > div.grid-8.column-1 > article > p:nth-child(4) > strong > a').attr().href;
        comic['zippyLink'] = zippyLink;
        console.log(zippyLink);
        return zippyLink;
    }, console.error)
    .then(url => {
        return phantom.create().then(instance => {
            return instance.createPage().then(page => {
                page.on('onResourceRequested', function(requestData) {
                    console.info('Requesting', requestData.url);
                  })
                .then(() => {
                    page.open(url);
                }).then(() => {
                    page.property('content');
                })
                .then(content => {
                    console.log(content);
                    return content;
                });
            })
        });
    });
    // .then(async (comic) => {
    //     var comicUrl = comic['zippyLink'];
    //     let browser = await puppeteer.launch();
    //     let page = await browser.newPage();
    //     await page.goto(comicUrl, {timeout: 0 });
    //     var downloadLink = await page.evaluate(() => {
    //         let title = document.querySelector('div[class = right] > div > a').href;
    //         return title;
    //     });
    //     await browser.close();
    //     comic['downloadLink'] = downloadLink;
    //     return comic;
    // }).catch((error)=>{
    //     console.log("At comicsCodes.js");
    //     console.log(error);
    // });
    // return comic;
}

module.exports = getSpecificComic;
