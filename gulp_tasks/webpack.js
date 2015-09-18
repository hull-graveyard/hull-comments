var _                = require('lodash');
var webpack          = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var gutil            = require('gulp-util');

function handleError(err, taskName) {
  if (err) {
    throw new gutil.PluginError('webpack:build', err);
  }
}

// Raise errors on Webpack build errors
function webpackFeedbackHandler(err, stats){
  handleError(err);

  var st = stats.toJson();

  if(st.errors.length > 0){
    gutil.log("[webpack:build:error]", JSON.stringify(st.errors));
    throw new gutil.PluginError("webpack:build:error", JSON.stringify(st.errors));
  }

  // Don't throw an error here : Uglify uses a lot of warnings to mention stripped code
  if(st.warnings.length > 0){
    gutil.log("[webpack:build:warning]", JSON.stringify(st.warnings,null,2));
  }
};

module.exports = function(gulp, config){

  var webpackConfig = require('../webpack.config')(config);

  //Production Build.
  //Minified, clean code. No demo keys inside.

  gulp.task('webpack', function(callback) {
    // Then, use Webpack to bundle all JS and html files to the destination folder
    webpack(webpackConfig.production, function(err, stats) {

      if (err){
        handleError(err, 'building project')
      }

      var jsonStats = stats.toJson();

      if (jsonStats.errors.length > 0){
        return new gutil.PluginError('webpack:build', JSON.stringify(jsonStats.errors));
      }

      if (jsonStats.warnings.length > 0){
        return new gutil.PluginError('webpack:build', JSON.stringify(jsonStats.warnings));
      }

      gutil.log('[webpack:build]', stats.toString({ colors: true }));
      notify({ message: 'Webpack Built'});
      callback();
    });
  });

  // Launch webpack dev server.
  gulp.task("webpack:server", function(callback) {

    var taskName = "webpack:server";
    var server = new WebpackDevServer(webpack(webpackConfig.development), {
      noInfo      : false,
      stats       : {colors: true },
      headers     : { "Access-Control-Allow-Origin": "*" },
      contentBase : config.outputFolder,
      hot         : config.hotReload
    }).listen(config.serverPort, function(err) {

      handleError(err, taskName);
      // Dump the preview URL in the console, and open Chrome when launched for convenience.
      var url = webpackConfig.development.output.publicPath+"webpack-dev-server/";
      gutil.log("["+taskName+"] started at ", url);
      callback()

    });
  });

}


