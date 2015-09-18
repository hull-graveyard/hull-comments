var sketch         = require('gulp-sketch');
var imagemin       = require('gulp-imagemin');

module.exports = function(gulp, config){

  gulp.task('sketch', function(){

    return gulp.src('symbols.sketch')
      .pipe(sketch(config.sketch))
      .pipe(imagemin(config.imagemin))
      .pipe(gulp.dest(config.sourceFolder+'/images/icons'))

  });


  gulp.task('sketch:watch', function(){
    return gulp.watch('*.sketch', { debounceDelay: 3000 }, ['sketch']);
  });

}
