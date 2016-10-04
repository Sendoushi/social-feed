/* eslint-disable strict */
'use strict';
/* eslint-enable */
/* global Promise */

// --------------------------------
// Vars / Imports

var feeds = {
    facebook: require('./modules/facebook.js'),
    twitter: require('./modules/twitter.js'),
    instagram: require('./modules/instagram.js')
};

require('es6-promise').polyfill();

// --------------------------------
// Functions

/**
 * Gets feeds
 * @param  {object} config
 * @return {promise}
 */
function get(config) {
    var keys = config && Object.keys(config);
    var promisedFeeds = [];
    var promises = [];
    var feed;
    var i;

    if (!config || typeof config !== 'object') {
        return new Promise(function (resolve, reject) {
            reject('A config object is needed!');
        });
    }

    // Get needed feeds promises
    for (i = 0; i < keys.length; i += 1) {
        feed = keys[i];

        if (!!config[feed]) {
            promisedFeeds.push(feed);
            promises.push(feeds[feed].get(config[feed]));
        }
    }

    // Promise all
    return Promise.all(promises)
    .then(function (data) {
        var finalData = {};

        // Lets parse data
        for (i = 0; i < promisedFeeds.length; i += 1) {
            finalData[promisedFeeds[i]] = data[i];
        }

        return finalData;
    });
}

// --------------------------------
// Export

module.exports = {
    get: get,
    facebook: feeds.facebook,
    twitter: feeds.twitter,
    instagram: feeds.instagram
};
