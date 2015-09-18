var esformatter = require('gulp-esformatter');
var sourcemaps = require('gulp-sourcemaps');
var filelog      = require('gulp-filelog');

module.exports = function(gulp, config){
  gulp.task('format', function() {
    return gulp.src(['src/**/*.js', 'src/**/*.jsx', '!src/vendors/**'])
      .pipe(filelog())
      .pipe(esformatter({
        indent: {
          value: '  '
        },
        preset: 'default'
      })).pipe(gulp.dest('src'))
  });


  gulp.task('format:watch', function() {
    return gulp.watch(['src/**/*.js', 'src/**/*.jsx'], { debounceDelay: 300 }, ['format']);
  });
}
