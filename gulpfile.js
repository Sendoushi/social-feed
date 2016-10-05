/* eslint-disable strict */
'use strict';
/* eslint-enable */

// Import packages
var path = require('path');
var gulp = require('gulp');
var util = require('gulp-util');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var ClosureCompilerPlugin = require('webpack-closure-compiler');

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
    var plugins = [
        new webpack.DefinePlugin({ IS_BROWSER: true })
    ];
    var task;

    if (isProd) {
        plugins.push(new ClosureCompilerPlugin({
            compiler: {
                language_in: 'ECMASCRIPT5',
                language_out: 'ECMASCRIPT5',
                compilation_level: 'ADVANCED'
            },
            concurrency: 3,
        }));
    }

    // Set task
    task = gulp.src(mainScript)
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
        plugins: plugins
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
