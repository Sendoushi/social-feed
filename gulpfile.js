/* eslint-disable strict */
'use strict';
/* eslint-enable */

// Import packages
var path = require('path');
var gulp = require('gulp');
var util = require('gulp-util');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');

// ---------------------------------------------
// Vars

var srcFolder = 'src';
var buildFolder = 'build';

var isProd = util.env.production || util.env.prod;

// ---------------------------------------------
// Task functions

/**
 * Build script
 */
function buildScript() {
    var mainScript = path.join(srcFolder, 'webpack/bootstrap.js');
    var destScriptFolder = buildFolder;

    var task = gulp.src(mainScript)
    .pipe(gulpWebpack({
        output: {
            filename: !isProd ? 'social-feeds.js' : 'social-feeds.min.js'
        },
        target: 'web',
        devtool: !isProd ? 'source-map' : null,
        cache: !isProd,
        debug: !isProd,
        bail: true,
        resolve: {
            // root: '.',
            extensions: ['', '.js'],
            modulesDirectories: ['src', 'node_modules']
        },
        module: {
            loaders: []
        },
        // TODO: Set closure compiler
        plugins: isProd && [new webpack.optimize.UglifyJsPlugin()]
    }))
    .pipe(gulp.dest(destScriptFolder));

    return task;
}

// ---------------------------------------------
// TASK

// Prepare build for dev
gulp.task('dist:build', [], function () {
    buildScript();
});
