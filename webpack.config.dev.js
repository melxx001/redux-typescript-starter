// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const webpack = require('webpack');
const config = require('./webpack.config');

const hostname = 'localhost';
const port = '3000';

config.cache = true;
config.debug = true;
config.devtool = 'inline-source-map';

config.entry.index.unshift(
  `webpack-dev-server/client?http://${hostname}:${port}/`,
  'webpack/hot/only-dev-server'
);

config.output.publicPath = 'http://' + hostname + ':' + port + '/client';

config.plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __PRODUCTION__: false,
    __DEV__: true,
  }),

  new webpack.HotModuleReplacementPlugin(),
  // new webpack.NoErrorsPlugin(),
];

config.devServer = {
  hot: true,
  https: false,
  inline: true,
  noInfo: true,
  port: port,
};

module.exports = config;
