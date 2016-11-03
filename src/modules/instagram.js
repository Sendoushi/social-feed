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
    var userId = config.query.userId;
    var token = config.access.token;
    var url = 'https://api.instagram.com/v1/users/';
    var limit = config.query.limit || 50;
    var timeout = config.query.timeout;
    var promise;

    url += userId + '/media/recent?access_token=' + token;

    if (config.access.proxy) {
        url = 'http://cors.io/?' + url;
    }

    // Lets set it up
    promise = new Promise(function (resolve, reject) {
        var timer = !!timeout ? setTimeout(resolve, timeout) : null;

        req.get(url, 'GET')
        .then(function (data) {
            if (!!timeout && !timer) {
                return resolve({ data: [] });
            }

            // Lets remove the timeout
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            // Lets remove the timeout
            clearTimeout(timer);
            timer = null;

            data = (typeof data === 'string') ? JSON.parse(data) : data;

            // And resolve the right data
            resolve(data);
        })
        .catch(function (err) {
            reject(err);
        });
    });

    // Lets process the promise
    promise.then(function (data) {
        return (data.data || data.items).splice(0, limit);
    });

    return promise;
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

    if (!config.query || !config.query.userId || !config.access || !config.access.token) {
        return new Promise(function (resolve, reject) {
            reject('Instagram needs a user id and a token!');
        });
    }

    // Lets retrieve the data now
    return proceedReq(config)
    .then(function (data) {
        return (data && !data.data) && { data: data } || data;
    });
}

// --------------------------------
// Export

module.exports = {
    get: get
};
