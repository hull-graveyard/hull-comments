"use strict";
/*global require, console*/


var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('./config');

[
  'clean',
  'copy',
  'deploy',
  'svgo',
  'ngrok',
  'sass',
  'webpack'
].map(function(task){require('./gulp_tasks/'+task+'.js')(gulp, config);})


gulp.task('default', ['server']);
gulp.task('serve',   ['server']);

gulp.task('prepare', function(callback){
  runSequence('clean', ['copy-files', 'sass'], callback)
});

gulp.task('watch',   function(callback){
  runSequence(['copy-files:watch', 'sass:watch'], callback);
});

gulp.task('serve',   function(callback){
  runSequence(['webpack:server', 'ngrok'], callback);
});

gulp.task('server', function(callback) {
  runSequence('prepare', 'watch', 'serve', callback);
});

gulp.task('build', function(callback) {
  runSequence('prepare', 'webpack', callback);
});

gulp.task('deploy', function(callback) {
  runSequence('build', 'gh:deploy', callback);
});
