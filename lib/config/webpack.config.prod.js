process.env.NODE_ENV = 'production';

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');

const getWebpackConfigBasic = require('./webpack.config.basic');

module.exports = function getWebpackConfigDev(entry, paths, options = {}) {
  const baseConfig = getWebpackConfigBasic(entry, paths, options);

  return webpackMerge(baseConfig, {
    devtool: 'none',
    optimization: {
      minimize: !process.env.BUILD_DEBUG,
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: {
              unused: false,
              warnings: false,
              drop_debugger: true,
              drop_console: (typeof options.dropConsole === 'boolean') ? options.dropConsole : true,
            },
            output: {
              ascii_only: true,
              comments: '/^\\**@hunzsig/',
              beautify: false,
            },
            mangle: true,
          },
        }),
        new OptimizeCSSAssetsPlugin({
          assetNameRegExp: /\.css\?_v\=(\d+)$/g,
          cssProcessorOptions: {
            reduceIdents: false,
            zindex: false,
            discardComments: {removeAll: true},
          },
        }),
      ],
    },
  });
};
