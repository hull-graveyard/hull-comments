var ghpages = require('gh-pages');

module.exports = function(gulp, config){

  // Deploy production bundle to gh-pages.
  gulp.task("gh:deploy", function (callback) {
    ghpages.publish(path.join(__dirname, config.outputFolder), callback);
  });

}
