var _ = require('underscore');
var path = require('path');
var webpack = require('webpack');
var config = require('./config');

var devEntry = {
  demo : [
    'webpack-dev-server/client?'+config.previewUrl,
    'webpack/hot/dev-server',
    config.entry.demo
  ],
  ship : [
    'webpack-dev-server/client?'+config.previewUrl,
    'webpack/hot/dev-server',
    config.entry.ship
  ]
}

var devOutput = _.extend({},config.output,{
  publicPath: config.previewUrl
});

module.exports = {
  development:{
   browser: {
      name: 'browser',
      devtool : 'eval',
      devServer: true,
      debug: true,
      entry   : devEntry,
      output: devOutput,
      resolve: {extensions: config.extensions},
      module: {loaders: config.loaders.development},
      plugins: config.plugins.concat([
        new webpack.DefinePlugin({
          PUBLIC_PATH: JSON.stringify(config.publicPath),
          HULL_CONFIG: JSON.stringify(config.HULL_CONFIG)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      ])
    }
  },
  production:{
    browser: {
      name: 'browser',
      entry: config.entry,
      output: config.output,
      resolve: {extensions: config.extensions},
      module: {loaders: config.loaders.production},
      plugins: config.plugins.concat([
        new webpack.DefinePlugin({
          PUBLIC_PATH: JSON.stringify(config.publicPath),
          HULL_CONFIG: JSON.stringify(config.HULL_CONFIG)
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
      ])
    }
  }
}
