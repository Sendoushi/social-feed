/* eslint-disable strict */
'use strict';
/* eslint-enable */
/* global describe it */

// --------------------------------
// Vars / Imports

var expect = require('expect.js');
var socialFeeds = require('../src/socialFeeds.js');
// Keys and tokens just for test purposes
var basicConfig = {
    twitter: {
        access: {
            consumerKey: 'ulFwf8RaQs6S9ElUbZnFxV0u4',
            consumerSecret: 'y0H2FqCYuoTTYD36Nob1Avc0lmyWEjEs7XopuCNmThQF9Vzfwj',
            token: '783357826949324800-Df16ktCCvZq87XaNjpEStOzm9KgozzZ',
            tokenSecret: 'c5c2t04WcPufIfcHytf8dKLeAQLVAuSCn3yKQOzYsqWyN'
        },
        query: {
            screenName: 'google',
            limit: 2
        }
    },
    instagram: {
        query: {
            screenName: 'google',
            limit: 10
        }
    }
};

// --------------------------------
// Basic and general tests

/**
 * Common basic tests
 * @param  {object} module
 */
function commonBasic(module) {
    it('should return a promise', function () {
        var promise = module.get();
        var promise2 = module.get({});

        expect(promise).to.have.property('then');
        expect(promise).to.have.property('catch');
        expect(promise2).to.have.property('then');
        expect(promise2).to.have.property('catch');

        promise.catch(function () {});
        promise2.catch(function () {});
    });

    it('should error without a config', function (done) {
        module.get()
        .then(function () {
            done('A config should be needed!');
        })
        .catch(function () {
            done();
        });
    });
}

/**
 * Common module tests
 * @param  {object} module
 * @param  {object} config
 */
function commonModule(module, config) {
    it('should error without proper config', function (done) {
        module.get({})
        .then(function () {
            done('A proper config should be needed!');
        })
        .catch(function () {
            done();
        });
    });

    it('should return data', function (done) {
        module.get(config)
        .then(function (data) {
            expect(data).to.have.property('data');
            expect(data.data).to.be.an('array');
            config.query.limit && expect(data.data.length).to.be.lessThan(config.query.limit + 1);
            done();
        })
        .catch(function (err) {
            done(err);
        });
    });
}

// --------------------------------
// Suite of tests

describe('get', function () {
    var module = socialFeeds;

    commonBasic(module);

    it('should resolve with empty config', function (done) {
        module.get({})
        .then(function (data) {
            expect(data).to.eql({});
            done();
        })
        .catch(function (err) {
            done(err);
        });
    });

    // TODO: Test modules results...
});

describe.skip('get.facebook', function () {
    var module = socialFeeds.facebook;

    commonBasic(module);
    commonModule(module);
});

describe('get.twitter', function () {
    var module = socialFeeds.twitter;
    var configTwitter = basicConfig.twitter;

    commonBasic(module);
    commonModule(module, configTwitter);

    it('should error without screen name', function (done) {
        module.get({
            access: configTwitter.access,
            query: {
                limit: configTwitter.limit
            }
        })
        .then(function () {
            done('A proper config should be needed!');
        })
        .catch(function () {
            done();
        });
    });

    it('should return twitter data', function (done) {
        module.get(configTwitter)
        .then(function (data) {
            expect(data.data[0]).to.have.property('created_at');
            expect(data.data[0]).to.have.property('id');
            expect(data.data[0]).to.have.property('text');
            done();
        })
        .catch(function (err) {
            done(err);
        });
    });
});

describe('get.instagram', function () {
    var module = socialFeeds.instagram;
    var configInstagram = basicConfig.instagram;

    commonBasic(module);
    commonModule(module, configInstagram);

    it('should error without screen name', function (done) {
        module.get({
            query: {
                limit: configInstagram.limit
            }
        })
        .then(function () {
            done('A proper config should be needed!');
        })
        .catch(function () {
            done();
        });
    });

    it('should return instagram data', function (done) {
        module.get(configInstagram)
        .then(function (data) {
            expect(data.data[0]).to.have.property('images');
            expect(data.data[0]).to.have.property('code');
            done();
        })
        .catch(function (err) {
            done(err);
        });
    });
});
