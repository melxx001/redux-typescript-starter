// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const webpack = require('webpack');
const config = require('./webpack.config');

const hostname = 'localhost';
const port = '8080';

config.cache = true;
config.debug = true;
config.devtool = 'inline-source-map';
config.entry.index.unshift(`webpack-dev-server/client?http://${hostname}:${port}/`);

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
];

config.devServer = {
  hot: true,
  inline: true,
};

module.exports = config;
