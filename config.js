'use strict';

var fs = require('fs');
var _ = require('underscore');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


// var banner = _.template([
//   '',
//   ' React ColumnView - <%= pkg.description %>',
//   ' @version v<%= pkg.version %>',
//   ' @link <%= pkg.homepage %>',
//   ' @license <%= pkg.license %>',
//   ' @author <%= pkg.author.name %> (<%= pkg.author.url %>)',
//   ''
// ].join('\n'), {pkg: pkg})();

var banner ="";
var LIB_NAME = 'hull-ship-comments';
var libName = 'HullShipComments';

var URL = 'http://localhost:8080/';
var OUTPUT_FOLDER='dist';
var ASSETS_FOLDER = 'assets';
var extensions = ['', '.js', '.jsx', '.css'];

var loaders = [
  {test: /.*\.json$/, loader: 'json'},
  {test: /.*\.md$/, loader: 'file'},
  {test: /\.jsx$/, loaders: ['react-hot', '6to5-loader']},
  {test: /\.css$/, loaders: ['style/useable', 'css-loader', 'autoprefixer-loader?browsers=last 2 version']},
  {test: /.*\.(gif|png|jpg)$/, loaders: ['file?hash=sha512&digest=hex&size=16&name=[hash].[ext]', 'image-webpack-loader?optimizationLevel=7&interlaced=false']},
  {test: /.*\.(eot|woff|ttf|svg)/, loader: 'file?hash=sha512&digest=hex&size=16&name=cd [hash].[ext]'},
];

var plugins = [
  new HtmlWebpackPlugin({
    title: libName+' Dev/Demo Page',
    template: 'src/demo.html',
    filename: 'demo.html'
  }),
  new HtmlWebpackPlugin({
    title: libName+ ' Ship',
    template: 'src/index.html',
    filename: 'index.html'
  }),
  new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')}}),
  new webpack.IgnorePlugin(/vertx/),
  new webpack.BannerPlugin(banner, { entryOnly: true }),
  new ExtractTextPlugin(LIB_NAME + '.css', {allChunks: true}),
]


var entry = {
  app: './src/app.js',
  ship: './src/ship.jsx'
}

var externals = {}
// var externals= /^[a-z\-0-9]+$/; // Every non-relative module is external,

module.exports = {
  LIB_NAME:LIB_NAME,
  libName: libName,
  URL: URL,
  OUTPUT_FOLDER: OUTPUT_FOLDER,
  ASSETS_FOLDER:ASSETS_FOLDER,
  extensions:extensions,
  entry: entry,
  plugins:plugins,
  loaders:loaders,
  externals:externals
}
