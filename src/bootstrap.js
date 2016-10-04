/* eslint-disable strict */
'use strict';
/* eslint-enable */

var socialFeeds = require('./socialFeeds.js');

if (!!window) {
    window.socialFeeds = socialFeeds;
}

module.exports = socialFeeds;
