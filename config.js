"use strict";

/*global module, require, process, __dirname */

var _            = require("lodash");
var webpack      = require("webpack");
var path         = require("path");
var moment       = require("moment");

var pkg          = require("./package.json");
var manifest     = require("./manifest.json");
var autoprefixer = require('autoprefixer-core');

// DO NOT CHANGE FOLDERS
// WIHTOUT UPDATING PACKAGE.JSON TOO.
var sourceFolder = "src";
var outputFolder = "dist";
var assetsFolder = "";
var serverPort   = process.env.PORT||8081;
var previewUrl   = "http://localhost:"+serverPort;

var hotReload = true;

// DO NOT CHANGE SHIP ENTRY
// WITHOUT UPDATING PACKAGE.JSON TOO
// THESE ARE THE JS FILES USED AS ENTRY POINTS TO COMPILE YOUR APP

var entry = {
  ship:  "./"+sourceFolder+"/ship.js",
  index: "./"+sourceFolder+"/index.js"
};

/*Icon Fonts Processing*/

var sketch = {
  export : 'artboards',
  formats: 'svg'
}

var imagemin = {
  progressive: true,
  svgoPlugins: [{
    removeViewBox: false,
    convertTransform:true
  }]
}

var sprite = {
  shape: {
    dimension : {
      maxWidth : 32,
      maxHeight: 32
    },
    spacing: {
      padding: 0
    }
  },
  mode : {
    view : {
      bust: false,
      dest: 'sprite',
      render: {
        scss: false
      }
    }
  }
};

var files = {
  "src/vendors/**/*" : path.join(outputFolder,assetsFolder,"vendors"),
  "src/images/**/*"  : path.join(outputFolder,assetsFolder,"images"),
  'locales'          : outputFolder,
  "manifest.json"    : outputFolder,
  "src/*.ico"        : outputFolder,
  "src/*.jpg"        : outputFolder,
  "src/*.png"        : outputFolder,
  "src/*.html"       : outputFolder,
  "CNAME"            : outputFolder,
};

var libName = pkg.name;
var displayName = manifest.name||libName;

var output = {
  path          : path.join(__dirname, outputFolder, assetsFolder,"/"),
  pathinfo      : true,
  filename      : "[name].js",
  chunkFileName : "[name].chunk.js",
  libraryTarget : "umd",
  library       : displayName,
  publicPath    : assetsFolder+"/"
};

var resolve = {
  extensions : ["", ".js", ".jsx", ".css", ".scss"]
}

var cssIncludes = ["node_modules", "src/vendor"].map(function(include){
  return ("includePaths[]="+path.resolve(__dirname, include));
}).join("&");


var postcss = [autoprefixer];

// about babel : it's VERY SLOW. DO NOT APPLY IT TO EVERY SOURCE FILE. see the Excludes we applied
var loaderLibrary = {
  json     : {test: /\.json$/,                loader: 'json' },
  css      : {test: /\.(css|scss)$/,          loaders: ['style/useable', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&'+cssIncludes]},
  file     : {test: /\.jpe?g$|\.gif$|\.png|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader : 'file' },
  svg      : {test: /\.svg$/,   loader : 'svg-inline' },
  js       : {test: /\.(js)$/,  loader: 'babel', exclude: /node_modules|src\/vendors/},
  prodJSX  : {test: /\.(jsx)$/, loader: 'babel', },
  devJSX   : {test: /\.(jsx)$/, loaders: ['react-hot', 'babel']}
}

var devLoaders = [
  loaderLibrary.json,
  loaderLibrary.css,
  loaderLibrary.file,
  loaderLibrary.js,
  (hotReload ? loaderLibrary.devJSX : loaderLibrary.prodJSX)
];

var loaders = [
  loaderLibrary.json,
  loaderLibrary.css,
  loaderLibrary.file,
  loaderLibrary.js,
  loaderLibrary.prodJSX
];


// We remove the "dist" from the filenames for demo and index.html in package.json
// Package.json expects our files to be addressable from the same repo
// We put them in `dist` to have a clean structure but then we need to build them in the right place
var plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
  new webpack.optimize.OccurenceOrderPlugin(),
  // new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js', minChunks: Infinity}),
  new webpack.DefinePlugin({
    "BUILD_DATE" : JSON.stringify(moment().format("MMMM, DD, YYYY, HH:mm:ss")),
    "PUBLIC_PATH": JSON.stringify(output.publicPath)
  })
];

var ngrok = {}
if(process.env.NGROK_AUTHTOKEN) {
  var ngrok = {
    port      : serverPort,
    authtoken : process.env.NGROK_AUTHTOKEN,
    subdomain : libName
  }
}



var devPlugins = plugins;
if(hotReload){
  var devEntry = _.reduce(entry,function(entries,v,k){
    entries[k] = [ 'webpack-dev-server/client?'+previewUrl, 'webpack/hot/only-dev-server', v ];
    return entries;
  },{});
  devPlugins = plugins.concat([new webpack.HotModuleReplacementPlugin()])
} else {
  devEntry = entry;
}

module.exports = {
  ngrok              : ngrok,

  hotReload          : hotReload,
  libName            : libName,
  displayName        : displayName,

  files              : files,

  sprite             : sprite,
  imagemin           : imagemin, 
  sketch             : sketch, 

  sourceFolder       : sourceFolder,
  outputFolder       : outputFolder,
  assetsFolder       : assetsFolder,
  serverPort         : serverPort,
  previewUrl         : previewUrl,

  devEntry           : devEntry,

  entry              : entry,
  output             : output,

  plugins            : plugins,
  devPlugins         : devPlugins,
  devLoaders         : devLoaders,

  resolve            : resolve,
  loaders            : loaders,

  postcss            : postcss,

  pkg                : pkg
};
