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
 * Gets page from a config
 * @param  {object} config
 * @return {promise}
 */
function getPage(config) {
    var appAccessToken = config.access.appId + '|' + config.access.appSecret;
    var fields = config.query.fields || 'id,link,name';
    var pageUrl = 'https://graph.facebook.com/v2.3/';
    var pageId = config.query.pageId;
    var timeout = config.query.timeout;
    var promise;

    pageUrl += pageId + '?key=value&access_token=' + appAccessToken + '&fields=' + fields;

    // Lets set it up
    promise = new Promise(function (resolve, reject) {
        var timer = !!timeout ? setTimeout(resolve, timeout) : null;

        req.get(pageUrl, 'GET')
        .then(function (data) {
            if (!!timeout && !timer) {
                return resolve();
            }

            // Lets remove the timeout
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            // And resolve the right data
            resolve(data);
        })
        .catch(function (err) {
            reject(err);
        });
    });

    return promise;
}

/**
 * Gets feed from a config
 * @param  {object} config
 * @return {promise}
 */
function getFeed(config) {
    var appAccessToken = config.access.appId + '|' + config.access.appSecret;
    var fields = config.query.fields || 'id,message,created_time,likes,comments';
    var graphUrl = 'https://graph.facebook.com/v2.3/';
    var feed = config.query.feed || 'feed';
    var limit = config.query.limit || 50;
    var pageId = config.query.pageId;
    var timeout = config.query.timeout;
    var promise;

    graphUrl += pageId + '/' + feed + '?key=value&access_token=' + appAccessToken;
    graphUrl += '&fields=' + fields + '&limit=' + limit;

    // Lets set it up
    promise = new Promise(function (resolve, reject) {
        var timer = !!timeout ? setTimeout(resolve, timeout) : null;

        req.get(graphUrl, 'GET')
        .then(function (data) {
            if (!!timeout && !timer) {
                return resolve();
            }

            // Lets remove the timeout
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            // And resolve the right data
            resolve(data);
        })
        .catch(function (err) {
            reject(err);
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
    var rightPromise;
    var type;

    if (!config || typeof config !== 'object') {
        return new Promise(function (resolve, reject) {
            reject('A config object is needed!');
        });
    }

    if (!config.access || !config.access.appId || !config.access.appSecret) {
        return new Promise(function (resolve, reject) {
            reject('Facebook needs an application id and an application secret!');
        });
    }

    if (!config.query || !config.query.pageId) {
        return new Promise(function (resolve, reject) {
            reject('Facebook needs a page id!');
        });
    }

    // Lets check the type
    type = config.query.type || 'feed';
    rightPromise = type === 'page' ? getPage : getFeed;

    // Lets retrieve the data now
    return rightPromise(config)
    .then(function (data) {
        return (data && !data.data) && { data: data } || data;
    });
}

// --------------------------------
// Export

module.exports = {
    get: get
};
