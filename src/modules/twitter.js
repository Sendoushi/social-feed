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
 * Proceeds with module request
 * @param  {object} config
 * @return {promise}
 */
function proceedReq(cb, config) {
    var timeout = config.query.timeout;
    var params = {
        screen_name: config.query.screenName,
        count: config.query.limit || 50,
        exclude_replies: config.query.excludeReplies,
        include_entities: config.query.includeEntities
    };
    var promise = new Promise(function (resolve, reject) {
        var timer = !!timeout ? setTimeout(resolve, timeout) : null;

        // Make the request
        cb.__call('statuses_userTimeline', params, function (reply, rate, err) {
            if (!!timeout && !timer) {
                return resolve();
            }

            // Lets remove the timeout
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            reply = (typeof reply === 'string') ? JSON.parse(reply) : reply;

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
    return proceedReq(cb, config)
    .then(function (data) {
        return (data && !data.data) && { data: data } || data;
    });
}

// --------------------------------
// Export

module.exports = {
    get: get
};
