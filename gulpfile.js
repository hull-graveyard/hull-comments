"use strict";
/*global require, console*/


var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('./config');

[
  'clean',
  'cloudfront',
  'copy',
  'deploy',
  // 'format',
  // 'iconfont',
  // 'iconsprite',
  'ngrok',
  'sass',
  // 'serve',
  // 'sketch',
  'webpack'
].map(function(task){require('./gulp_tasks/'+task+'.js')(gulp, config);})


gulp.task('default', ['server']);
gulp.task('serve',   ['server']);

gulp.task('prepare', function(callback){
  runSequence('clean', ['copy', 'sass'], callback)
});

gulp.task('watch',   function(callback){
  runSequence(['copy:watch', 'sass:watch'], callback);
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
  runSequence('build', 'gh:deploy', 'cloudfront', callback);
});
