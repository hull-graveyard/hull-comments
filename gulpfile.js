var _ = require('underscore');
var del = require('del');
var open = require("open");
var path = require('path');
var assign = require('object-assign');
var runSequence = require('run-sequence');

var gulp = require('gulp');
var gutil = require('gulp-util');
var deploy = require('gulp-gh-pages');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

// Get our Config.
var config = require('./config');
var webpackConfig = require('./webpack.config');

gulp.task('default', ['server']);
gulp.task('serve', ['server']);
gulp.task('clean',   function(cb)       {del(['./'+config.outputFolder+'/**/*'], cb); });

gulp.task('server',  function(callback) {runSequence('clean', 'copy-files', 'webpack:server', callback); });
gulp.task('build',   function(callback) {runSequence('clean', 'copy-files', 'webpack:build',                       callback); });
gulp.task('deploy',  function(callback) {runSequence('build', 'gh:deploy', callback); });

// Copy static files from the source to the destination
gulp.task('copy-files', function () {
  return gulp.src(config.files.source)
    .pipe(gulp.dest(config.outputFolder))
});

//Production Build.
//Minified, clean code. No demo keys inside.
//demo.html WILL NOT WORK with this build.
//
//Webpack handles CSS/SCSS, JS, and HTML files.
//Gulp copies a few more files such as manifest.json to the output folder
gulp.task('webpack:build', function(callback) {

  // Then, use Webpack to bundle all JS and html files to the destination folder 
  webpack(_.values(webpackConfig.production), function(err, stats) {
    if (err) {throw new gutil.PluginError('webpack:build', err); }
    gutil.log('[webpack:build]', stats.toString({colors: true}));
    callback();
  });
});

// Dev Build
// Create the webpack compiler here for caching and performance.
var devCompiler = webpack(webpackConfig.development.browser);

// Build a Dev version of the project. Launched once on startup so we can have eveything copied.
gulp.task('webpack:build:dev', function(callback) {

  // Copy the support files to the destination folder.
  gulp.src(config.files.source).pipe(gulp.dest(config.outputFolder))

  // run webpack with Dev profile.
  // Embeds the Hull config keys, and the necessary stuff to make demo.html work
  devCompiler.run(function(err, stats) {
    if (err) {throw new gutil.PluginError('webpack:build', err); }
    gutil.log('[webpack:build]', stats.toString({colors: true}));
    callback();
  });
});

// Launch webpack dev server.
gulp.task('webpack:server', function(callback) {
  new WebpackDevServer(devCompiler, {
    contentBase: '/',
    hot: true,
    stats: {colors: true }
  }).listen(8080, '0.0.0.0', function(err) {
    if(err) throw new gutil.PluginError('webpack:server', err);

    // Dump the preview URL in the console, and open Chrome when launched for convenience.
    var url = webpackConfig.development.browser.output.publicPath+'webpack-dev-server/demo.html'
    gutil.log('[webpack:server]', url);
    open(url,'chrome');
  });
});

// Deploy production bundle to gh-pages.
gulp.task('gh:deploy', function () {
    return gulp.src(outputBundle)
        .pipe(deploy(options));
});

