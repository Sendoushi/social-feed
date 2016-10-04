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
 * Gets twitter timeline
 * @param  {object} query
 * @return {promise}
 */
function getTimeline(cb, query) {
    var params = {
        screen_name: query.screenName,
        count: query.limit
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
    var access = config && config.access;
    var cb;

    if (!config || typeof config !== 'object') {
        return new Promise(function (resolve, reject) {
            reject('A config object is needed!');
        });
    }

    if (!access || !access.consumerKey || !access.consumerSecret || !access.token || !access.tokenSecret) {
        return new Promise(function (resolve, reject) {
            reject('Twitter needs a consumer key, consumer secret, token and a token secret!');
        });
    }

    if (!config.query || !config.query.screenName) {
        return new Promise(function (resolve, reject) {
            reject('Twitter needs a screen name!');
        });
    }

    cb = new Codebird;
    cb.setConsumerKey(access.consumerKey, access.consumerSecret);
    cb.setToken(access.token, access.tokenSecret);

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
