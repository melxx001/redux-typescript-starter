// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');


const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');

config.entry = {
  index: [
    './src/index.tsx',
  ],
};

config.output = {
  filename: '[name].js',
  path: path.join(__dirname, '_client'),
  publicPath: 'assets',
};

config.plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __PRODUCTION__: true,
    __DEV__: false,
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),

  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),

  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    comments: false,
    sourceMap: false,
    mangle: true,
    minimize: true,
  }),
];

module.exports = config;
