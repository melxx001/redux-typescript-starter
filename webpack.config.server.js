// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');

config.target = 'node';

config.entry = {
  index: [
    './src/server.tsx',
  ],
};

config.output = {
  filename: '[name].js',
  path: path.join(__dirname, '_server'),
};

config.plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: false,
    __SERVER__: true,
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

config.externals = fs.readdirSync('node_modules').reduce((accumulator, module) => {
  accumulator[module] = 'commonjs ' + module;
  return accumulator;
}, {});

module.exports = config;
