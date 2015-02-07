
'use strict';
var _ = require('underscore');
var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var del = require('del');
var assign = require('object-assign');
var webpack = require('webpack');
var gulp_webpack = require('gulp-webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var path = require('path');
// var browserSync = require('browser-sync');

var config = require('./config');
var PUBLIC_PATH = config.PUBLIC_PATH;

// The development server (the recommended option for development)
gulp.task('default', function(callback) {runSequence('clean', 'webpack:server', callback); });
gulp.task('server', function(callback)  {runSequence('clean', 'webpack:build:dev', 'webpack:server', callback); });
gulp.task('build', function(callback)   {runSequence('clean', 'webpack:build', callback); });

gulp.task('clean', function(cb) {del(['./dist/**/*'], cb); });

gulp.task('webpack:build', function(callback) {
  webpack(_.values(webpackConfig.production), function(err, stats) {
    if (err) {throw new gutil.PluginError('webpack:build', err); }
    gutil.log('[webpack:build]', stats.toString({colors: true}));
    callback();
  });
});

// modify some webpack config options
var webpackDevConfig = Object.create(webpackConfig.development.browser);
var devCompiler = webpack(webpackDevConfig);

gulp.task('webpack:build:dev', function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if (err) {throw new gutil.PluginError('webpack:build', err); }
    gutil.log('[webpack:build]', stats.toString({colors: true}));
    callback();
  });
});

gulp.task('webpack:server', function(callback) {
  new WebpackDevServer(devCompiler, {
    contentBase: './dist',
    hot: true,
    stats: {colors: true }
  }).listen(8080, '0.0.0.0', function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err);
    // browserSync({proxy: 'localhost:8080'});
    gutil.log('[server]', webpackConfig.development.browser.output.publicPath+'webpack-dev-server/index.html');
  });

});
