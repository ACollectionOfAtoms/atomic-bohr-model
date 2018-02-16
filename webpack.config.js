var path = require('path');
var webpack = require('webpack')
var libraryName = 'atomicBohrModel'
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;

var outputFile = libraryName;
var plugins = [];

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({minimize: true}));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js'
}

module.exports = {
  context: __dirname,

  entry: ['./src/app.js', './src/css/main.css'],
  output: {
    path: path.resolve('./dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'var',
    umdNamedDefine: true
  },
  devtool: 'source-map',
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
              plugins: ['add-module-exports'],
              presets: ['es2015']
            }
          },
          {
            test: /\.json$/,
            loader: 'json'
          },
          {
            test: /\.css$/,
            loader: "style-loader!css-loader"
          }
      ]
  },
  resolve: {
    moduleDirectores: ['node_modules'],
    root: ['.'],
    extensions: ['', '.js']
  },
  plugins: plugins,
  externals:[{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
  }]
};
