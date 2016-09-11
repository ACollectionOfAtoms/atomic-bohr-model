var path = require('path');
var webpack = require('webpack')
// var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,

  entry: ['./app.js', 'libs/svgUtils.js'],
  output: {
    path: path.resolve('./bundles/'),
    filename: 'bundle.js'
  },
  module: {
      loaders: [
          {
            test: require.resolve('jquery'),
            loader: 'expose?$!expose?jQuery'
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              plugins: ['transform-runtime'],
              presets: ['es2015']
            }
          },
          {
            test: /\.json$/,
            loader: 'json'
          }
      ]
  },
  resolve: {
    moduleDirectores: ['node_modules'],
    root: ['.'],
    extensions: ['', '.js']
  }
};
