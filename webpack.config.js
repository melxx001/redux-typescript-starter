// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const webpack = require('webpack');
const path = require('path');
const production = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    index: [
      './src/index.tsx',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '_build'),
    publicPath: 'assets',
  },
  debug: !production,
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    root: path.join(__dirname, 'src'),
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: true,
      __DEV__: false,
    }),

    // NOTE: https://github.com/gaearon/babel-plugin-react-transform#configuration
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production',
      },
    }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],

    preLoaders: [
      // All output '.js' files will have any source maps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: 'source-map-loader' },
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  // },
};

module.exports = config;
