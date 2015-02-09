'use strict';

var fs = require('fs');
var _ = require('underscore');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HULL_CONFIG = require('./env');
var pkg = require('./package.json');

var LIB_NAME = pkg.name;
var displayName = pkg.hull.displayName||LIB_NAME;

var previewUrl   = 'http://localhost:8080/';

// DO NOT CHANGE FOLDERS
// WIHTOUT UPDATING PACKAGE.JSON TOO.
var sourceFolder = 'src';
var outputFolder = 'dist';
var assetsFolder = 'assets';

var gulpFiles    = {
  source: ['package.json', 'locales/*'],
  dest: outputFolder
}

// DO NOT CHANGE SHIP ENTRY
// WITHOUT UPDATING PACKAGE.JSON TOO
var entry = {
  app:  './'+sourceFolder+'/app.js',
  ship: './'+sourceFolder+'/ship.js'
}

var extensions   = ['', '.js', '.jsx', '.css', '.scss'];
var sassIncludePaths=([
  './bower_components','./node_modules'
]).map(function(include){
  return ("includePaths[]="+path.resolve(__dirname, include))
}).join('&');



var loaders = [
  {test: /.*\.md$/, loader: 'file'},
  {test: /\.(jsx|js)$/, loaders: ['react-hot', '6to5-loader']},
  {test: /\.(css|scss)$/, loaders: ['style/useable', 'css-loader', 'sass-loader?outputStyle=expanded&'+sassIncludePaths, 'autoprefixer-loader?browsers=last 2 version']},
  {test: /.*\.(gif|png|jpg)$/, loaders: ['file', 'image-webpack-loader?optimizationLevel=7&interlaced=false']},
  {test: /.*\.(eot|woff|ttf|svg)/, loader: 'file'},
];

var plugins = [
  new HtmlWebpackPlugin({
    title: displayName+' Dev/Demo Page',
    template: path.join(sourceFolder,pkg.hull.demo),
    filename: pkg.hull.demo
  }),
  new HtmlWebpackPlugin({
    title: displayName+ ' Ship',
    template: path.join(sourceFolder,pkg.hull.index),
    filename: pkg.hull.index
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')}}),
  // new webpack.IgnorePlugin(/vertx/),
  new ExtractTextPlugin('[name].css', {allChunks: true}),
]

var externals = {}
// var externals= /^[a-z\-0-9]+$/; // Every non-relative module is external,

module.exports = {
  previewUrl: previewUrl,
  outputFolder: outputFolder,
  assetsFolder:assetsFolder,
  HULL_CONFIG: HULL_CONFIG,
  LIB_NAME:LIB_NAME,
  files :gulpFiles,
  displayName: displayName,
  extensions:extensions,
  entry: entry,
  plugins:plugins,
  loaders:loaders,
  externals:externals
}
