var localtunnel = require('localtunnel');
var gutil = require("gulp-util");
var assign = require("object-assign");

// Setup a localtunnel server
module.exports = function(gulp, config) {

  gulp.task('localtunnel', function(callback) {
    var tunnel = localtunnel(config.serverPort, config.localtunnel, function(error, tunnel) {
      if (error) throw new gutil.PluginError('ship:server', error);
      var url = tunnel.url.replace('https', 'http');
      gutil.log('[ship:server] Ready at', url);
      callback()
    });
    if (!config.localtunnel) {
      return callback();
    }
  });
}
