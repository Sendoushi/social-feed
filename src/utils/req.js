/* eslint-disable strict */
'use strict';
/* eslint-enable */
/* global Promise */

// --------------------------------
// Vars / Imports

require('es6-promise').polyfill();

// --------------------------------
// Functions

/**
 * Gets the XML HTTP Request object, trying to load it in various ways
 * @return {object} The XMLHttpRequest object instance
 */
function getXmlRequestObject() {
    var xml = null;
    var XMLHttpRequest;

    if (typeof window === 'object' && window && typeof window.XMLHttpRequest !== 'undefined') {
        // First, try the W3-standard object
        xml = new window.XMLHttpRequest();
    } else if (typeof require === 'function' && require) {
        // now, consider RequireJS and/or Node.js objects

        try {
            // look for xmlhttprequest module
            XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
            xml = new XMLHttpRequest();
        } catch (err) {
            // or maybe the user is using xhr2
            XMLHttpRequest = require('xhr2');
            xml = new XMLHttpRequest();
        }
    }

    return xml;
}

/**
 * Makes a request
 * @param  {string} url
 * @param  {string} method
 * @return {promise}
 */
function makeReq(url, method) {
    var xhr = getXmlRequestObject();
    var promise = new Promise(function (resolve, reject) {
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText,
                    response: xhr.response
                });
            }
        };
    });

    // Finally the request
    xhr.open(method, url, true);
    xhr.responseType = 'json';
    xhr.send(null);

    return promise;
}

// --------------------------------
// Export

module.exports = {
    get: makeReq
};
