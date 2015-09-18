var imagemin   = require('gulp-imagemin');
var path       = require('path');

module.exports = function(gulp, config){

  var iconsFolder = path.join(config.sourceFolder,'icons','**','*');

  gulp.task('svgo', function(){

    return gulp.src(iconsFolder)
      .pipe(imagemin(config.imagemin))
      .pipe(gulp.dest(path.join(config.sourceFolder,'icons')))

  });


  // gulp.task('sketch:watch', function(){
  //   return gulp.watch(iconsFolder, { debounceDelay: 3000 }, ['svgo']);
  // });

}
