var ghpages = require('gh-pages');
var path = require('path');

module.exports = function(gulp, config){
  // Deploy production bundle to gh-pages.
  gulp.task("gh:deploy", function (callback) {
    return ghpages.publish(path.join(__dirname,'..', config.outputFolder), callback);
  });

}
