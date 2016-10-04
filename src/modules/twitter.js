/* eslint-disable strict */
'use strict';
/* eslint-enable */
/* global Promise */

// --------------------------------
// Vars / Imports

var Codebird = require('codebird');

require('es6-promise').polyfill();

// --------------------------------
// Functions

/**
 * Makes a request
 * @param  {string} url
 * @param  {string} method
 * @return {promise}
 */
// function makeReq(url, method) {
//     var xhr = new XMLHttpRequest();
//     var promise = new Promise(function (resolve, reject) {
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 resolve(xhr.responseText);
//             } else {
//                 reject(xhr.status);
//             }
//         };
//     });

//     // Finally the request
//     xhr.open(method, url, true);
//     xhr.send(null);

//     return promise;
// }

/**
 * Gets twitter timeline
 * @param  {object} query
 * @return {promise}
 */
function getTimeline(cb, query) {
    // var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
    // var params = [];

    // // Params
    // params.push('screen_name=sendoushi');
    // params.push('count=2');

    // // Lets build the url
    // url += '?' + params.join('&');

    // return makeReq(url, 'GET');

    var params = {
        screen_name: query.screenName,
        count: query.count
    };
    var promise = new Promise(function (resolve, reject) {
        // Make the request
        cb.__call('statuses_userTimeline', params, function (reply, rate, err) {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });

    return promise;
}

/**
 * Gets feed for the module
 * @param  {object} config
 * @return {promise}
 */
function get(config) {
    var cb;

    if (!config || typeof config !== 'object') {
        return new Promise(function (resolve, reject) {
            reject('A config object is needed!');
        });
    }

    if (!config.access || !config.access.token || !config.access.tokenSecret) {
        return new Promise(function (resolve, reject) {
            reject('Twitter needs a token and a token secret!');
        });
    }

    cb = new Codebird;
    cb.setConsumerKey(config.access.consumerKey, config.access.consumerSecret);
    cb.setToken(config.access.token, config.access.tokenSecret);

    // Lets retrieve the data now
    return getTimeline(cb, config.query || {})
    .then(function (data) {
        return {
            data: data
        };
    });
}

// --------------------------------
// Export

module.exports = {
    get: get
};
