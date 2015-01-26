module.exports = {
  cache: true,
  entry: './index',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' },
      { test: /\.css$/, loader: 'style/useable!css-loader' }
    ]
  }
};
