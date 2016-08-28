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
  }),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: 'production',
    },
  }),
];

config.externals = fs.readdirSync('node_modules').reduce((accumulator, module) => {
  accumulator[module] = 'commonjs ' + module;
  return accumulator;
}, {});

module.exports = config;
