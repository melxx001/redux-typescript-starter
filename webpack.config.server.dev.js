// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const webpack = require('webpack');
const config = require('./webpack.config.server');

config.cache = true;
config.debug = true;
config.devtool = 'source-map';
config.watch = true;

config.entry.index.unshift(
  'webpack/hot/poll?1000'
);

config.plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: false,
    __SERVER__: true,
    __PRODUCTION__: false,
    __DEV__: true,
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
];

module.exports = config;
