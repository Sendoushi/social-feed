/* eslint-disable strict */
'use strict';
/* eslint-enable */
/* global Promise */

// --------------------------------
// Vars / Imports

var req = require('../utils/req.js');

require('es6-promise').polyfill();

// --------------------------------
// Functions

/**
 * Proceeds with module request
 * @param  {object} config
 * @return {promise}
 */
function proceedReq(config) {
    var screenName = config.query.screenName;
    var url = 'https://www.instagram.com/' + screenName + '/media';
    var limit = config.query.limit || 50;

    return req.get(url, 'GET')
    .then(function (data) {
        return (data.data || data.items).splice(0, limit);
    });
}

/**
 * Gets feed for the module
 * @param  {object} config
 * @return {promise}
 */
function get(config) {
    if (!config || typeof config !== 'object') {
        return new Promise(function (resolve, reject) {
            reject('A config object is needed!');
        });
    }

    if (!config.query || !config.query.screenName) {
        return new Promise(function (resolve, reject) {
            reject('Instagram needs a screen name!');
        });
    }

    // Lets retrieve the data now
    return proceedReq(config)
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
