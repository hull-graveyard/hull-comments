var esformatter = require('gulp-esformatter');
var filelog      = require('gulp-filelog');

// Formats your sourcecode to be more pretty.
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
