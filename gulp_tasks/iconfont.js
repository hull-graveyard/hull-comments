var iconfont       = require('gulp-iconfont')
var iconfontCss    = require('gulp-iconfont-css')
var path           = require('path');
var rename         = require('gulp-rename');
var consolidate    = require('gulp-consolidate');
var svgSprite      = require('gulp-svg-sprite');
var merge          = require('merge-stream');
var fontName       = 'iconfont';
var fontPath       = 'fonts';

module.exports = function(gulp, config){

  var iconsFolder = path.join(config.sourceFolder,'icons','**','*');
  var runTimestamp = Math.round(Date.now()/1000);

  gulp.task('iconfont', function(){

    var icons = gulp.src(iconsFolder)

    var sprite = icons
      .pipe(svgSprite(config.sprite))
      .pipe(rename({basename: 'sprite'}))
      .pipe(gulp.dest(path.join(config.outputFolder,config.assetsFolder)));

    var font = icons
      .pipe(iconfont({
        fontName     : fontName,
        fontHeight   : 1001,
        normalize    : true,
        formats      : ['ttf','eot','woff','svg'],
        timestamp    : runTimestamp
      }))
      .on('glyphs',function(glyphs,options){

        var opts = {
          glyphs   : glyphs,
          fontName : fontName,
          fontPath : fontPath+'/',
          className: 'icon'
        }

        gulp.src('templates/iconfont.css')
          .pipe(consolidate('lodash',opts))
          .pipe(rename({baseName:fontName}))
          .pipe(gulp.dest(path.join(config.sourceFolder,'styles','hullstrap')));

        gulp.src('templates/iconfont.html')
          .pipe(consolidate('lodash', opts))
          .pipe(rename({ basename: fontName }))
          .pipe(gulp.dest(path.join('server','views')));
      })
      .pipe(gulp.dest(path.join(config.sourceFolder,'styles',fontPath)));

    return merge(font, sprite)    

  });

  gulp.task('iconfont:watch', function(){
    return gulp.watch(iconsFolder, { debounceDelay: 3000 }, ['iconfont']);
  });

}
