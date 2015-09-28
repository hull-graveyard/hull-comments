var cloudfront       = require('gulp-invalidate-cloudfront');

module.exports=function(gulp, config){

  gulp.task('cloudfront', function(callback){

    if(!config.cloudfront){ throw new gutil.PluginError('cloudfront', 'cloudfront is not configured properly, checkout config.js'); }

    return gulp.src('**/*.js')
    .pipe(cloudfront(config.cloudfront.invalidationBatch, config.cloudfront.config))
  })
}
