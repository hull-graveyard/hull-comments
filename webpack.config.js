var path = require('path');
var webpack = require('webpack');
var config = require('./config');

var FILESYSTEM_PATH = path.join(__dirname, config.OUTPUT_FOLDER);
var ASSETS_PATH = path.join(FILESYSTEM_PATH,config.ASSETS_FOLDER,'/');
var devEntry = config.entry;

devEntry.app = [
  'webpack-dev-server/client?'+config.URL,
  'webpack/hot/dev-server',
  devEntry.app
];

devEntry.ship = [
  'webpack-dev-server/client?'+config.URL,
  'webpack/hot/dev-server',
  devEntry.ship
];

module.exports = {
  production:{
    browser: {
      name: 'browser',
      entry: config.entry,
      output: {
        path: FILESYSTEM_PATH,
        publicPath: '/',
        library: [config.libName, "[name]"],
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
        path: FILESYSTEM_PATH+'/',
        publicPath: config.URL,
        library: [config.libName, "[name]"],
        libraryTarget: "umd",
        filename: '[name].js'
      },
      resolve: {extensions: config.extensions},
      module: {loaders: config.loaders},
      plugins: config.plugins.concat([
        new webpack.DefinePlugin({
          PUBLIC_PATH: JSON.stringify(config.PUBLIC_PATH),
          HULL_CONFIG: JSON.stringify(config.HULL_CONFIG)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      ])
    }
  }
}
