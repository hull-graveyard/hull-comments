var esformatter = require('gulp-esformatter');

// Formats your sourcecode to be more pretty.
module.exports = function(gulp, config){
  gulp.task('format', function() {
    return gulp.src(["src/lib/engine.js"])
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
