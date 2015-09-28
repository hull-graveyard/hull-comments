var iconfont       = require('gulp-iconfont')
var iconfontCss    = require('gulp-iconfont-css')
var rename         = require('gulp-rename');
var consolidate    = require('gulp-consolidate');

module.exports = function(gulp, config){

  var icons       = config.icons;
  var src         = icons && icons.src;
  var output      = icons && icons.output;
  var fontConfig  = icons && icons.font;

  gulp.task('iconfont', function(){

    if(!icons || !src || !fontConfig){ throw new gutil.PluginError('iconfont', 'iconfont is not configured properly, checkout config.js'); }

    return gulp.src(src)
      .pipe(iconfont(fontConfig))
      .on('glyphs',function(glyphs,options){

        var opts = {
          glyphs   : glyphs,
          fontName : fontConfig.fontName,
          fontPath : icons.fontPath+'/',
          className: 'icon'
        }

        gulp.src('templates/iconfont.css')
          .pipe(consolidate('lodash',opts))
          .pipe(rename({ baseName:fontConfig.fontName }))
          .pipe(gulp.dest(output.css));

        gulp.src('templates/iconfont.html')
          .pipe(consolidate('lodash', opts))
          .pipe(rename({ basename: fontConfig.fontName }))
          .pipe(gulp.dest(output.html));

      })
    .pipe(gulp.dest(output.font));

  });

  gulp.task('iconfont:watch', function(){
    return gulp.watch(src, { debounceDelay: 3000 }, ['iconfont']);
  });

}
