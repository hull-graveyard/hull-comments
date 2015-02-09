'use strict';

var fs = require('fs');
var _ = require('underscore');
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HULL_CONFIG = require('./env');
var pkg = require('./package.json');

var LIB_NAME = pkg.name;
var displayName = pkg.hull.displayName||LIB_NAME;


// DO NOT CHANGE FOLDERS
// WIHTOUT UPDATING PACKAGE.JSON TOO.
var sourceFolder = 'src';
var outputFolder = 'dist';
var previewUrl   = 'http://localhost:8080/';

var outputPath = path.join(__dirname, outputFolder);

// DO NOT CHANGE SHIP ENTRY
// WITHOUT UPDATING PACKAGE.JSON TOO
var entry = {
  ship: './'+sourceFolder+'/ship.js',
  demo:  './'+sourceFolder+'/demo.js'
}
var output = {
  path: outputPath,
  publicPath: '/'+outputFolder+'/',
  library: [displayName, '[name]'],
  libraryTarget: 'umd',
  chunkFileName: '[id].chunk.js',
  filename: '[name].js'
}

var gulpFiles    = {
  source: ['locales'],
  dest: outputFolder
}


var extensions   = ['', '.js', '.jsx', '.css', '.scss'];

var sassIncludePaths=([
  './bower_components','./node_modules'
]).map(function(include){
  return ("includePaths[]="+path.resolve(__dirname, include))
}).join('&');

var ldrs={
  react: {test: /\.(jsx|js)$/, loaders: ['react-hot', '6to5-loader']},
  style:    {test: /\.(css|scss)$/, loaders: ['style/useable', 'css-loader', 'sass-loader?outputStyle=expanded&'+sassIncludePaths, 'autoprefixer-loader?browsers=last 2 version']},
  image:    {test: /.*\.(gif|png|jpg)$/, loaders: ['file', 'image-webpack-loader?optimizationLevel=7&interlaced=false']},
  font:     {test: /.*\.(eot|woff|ttf|svg)/, loader: 'file'},
}

var loaders = {
  development:[ldrs.react,ldrs.style,ldrs.image,ldrs.font],
  production: [ldrs.react,ldrs.style,ldrs.image,ldrs.font]
}

// We remove the 'dist' from the filenames for demo and index.html in package.json
// Package.json expects our files to be addressable from the same repo
// We put them in `dist` to have a clean structure but then we need to build them in the right place
var demoFileName  = pkg.hull.demo.replace(outputFolder+'/','');
var indexFileName = pkg.hull.index.replace(outputFolder+'/','');

var plugins = [
  new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')}}),
  new HtmlWebpackPlugin({
    title: displayName+' Dev/Demo Page',
    template: path.join(sourceFolder,demoFileName),
    filename: demoFileName
  }),
  new HtmlWebpackPlugin({
    title: displayName+ ' Ship',
    template: path.join(sourceFolder,indexFileName),
    filename: indexFileName
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
]


var externals = {}
// var externals= /^[a-z\-0-9]+$/; // Every non-relative module is external,

module.exports = {
  LIB_NAME:LIB_NAME,
  displayName: displayName,
  HULL_CONFIG: HULL_CONFIG,

  entry: entry,
  output: output,
  files :gulpFiles,
  outputFolder: outputFolder,
  previewUrl: previewUrl,

  extensions:extensions,
  plugins:plugins,
  loaders:loaders,
  externals:externals
}
