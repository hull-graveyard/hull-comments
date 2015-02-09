var path = require('path');
var webpack = require('webpack');
var config = require('./config');

var fileSystemPath = path.join(__dirname, config.outputFolder);
var assetsPath =     path.join(__dirname, config.outputFolder,config.assetsFolder,'/');
var devEntry = config.entry;

devEntry.app = [
  'webpack-dev-server/client?'+config.previewUrl,
  'webpack/hot/dev-server',
  devEntry.app
];

devEntry.ship = [
  'webpack-dev-server/client?'+config.previewUrl,
  'webpack/hot/dev-server',
  devEntry.ship
];

module.exports = {
  production:{
    browser: {
      name: 'browser',
      entry: config.entry,
      output: {
        path: fileSystemPath,
        publicPath: '/',
        library: [config.displayName, "[name]"],
        libraryTarget: "umd",
        filename: '[name].js'
      },
      resolve: {extensions: config.extensions},
      module: {loaders: config.loaders},
      plugins: config.plugins.concat([
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
      ])
    }
  },
  development:{
   browser: {
      name: 'browser',
      devtool : 'eval',
      debug: true,
      entry   : devEntry,
      output: {
        path: fileSystemPath,
        publicPath: config.previewUrl,
        library: [config.displayName, "[name]"],
        libraryTarget: "umd",
        filename: '[name].js'
      },
      resolve: {extensions: config.extensions},
      module: {loaders: config.loaders},
      plugins: config.plugins.concat([
        new webpack.DefinePlugin({
          PUBLIC_PATH: JSON.stringify(config.publicPath),
          HULL_CONFIG: JSON.stringify(config.HULL_CONFIG)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      ])
    }
  }
}
