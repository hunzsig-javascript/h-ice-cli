const getBabelConfig = require('./getBabelConfig');
const colors = require('chalk');
const deepAssign = require('deep-assign');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const postcssConfig = require('./postcssConfig');

const BABEL_LOADER = require.resolve('babel-loader');
const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const SASS_LOADER = require.resolve('sass-loader');
const CSS_HOT_LOADER = require.resolve('css-hot-loader');
const URL_LOADER = require.resolve('url-loader');
const URL_LOADER_LIMIT = 8192;

function withCssHotLoader(loaders) {
  if (process.env.NODE_ENV !== 'production') {
    return [CSS_HOT_LOADER].concat(loaders);
  }
  return loaders;
}

module.exports = (paths, buildConfig = {}) => {
  const primaryTheme = buildConfig.primaryTheme || { 'primary-color': '#1890ff' };
  const babelConfig = getBabelConfig(buildConfig);
  const cssLoaders = [
      {
          loader: CSS_LOADER,
          options: {
              sourceMap: true,
          },
      },
      {
          loader: POSTCSS_LOADER,
          options: Object.assign({ sourceMap: true }, postcssConfig),
      }
  ];
  const sassLoaders = [
    {
      loader: CSS_LOADER,
      options: {
        sourceMap: true,
      },
    },
    {
      loader: POSTCSS_LOADER,
      options: Object.assign({ sourceMap: true }, postcssConfig),
    },
    {
      loader: SASS_LOADER,
      options: {
        sourceMap: true,
      },
    },
  ];
  const lessLoaders = [
    {
      loader: CSS_LOADER,
      options: {
        sourceMap: true,
      },
    },
    {
      loader: POSTCSS_LOADER,
      options: Object.assign({ sourceMap: true }, postcssConfig),
    },
    {
      loader: LESS_LOADER,
      options: {
        sourceMap: true,
        javascriptEnabled: true,
        modifyVars: primaryTheme
      },
    },
  ];

  return [
    {
      test: /\.scss$/,
      use: withCssHotLoader([MiniCssExtractPlugin.loader, ...sassLoaders]),
    },
    {
      test: /\.css$/,
      use: withCssHotLoader([MiniCssExtractPlugin.loader, ...cssLoaders]),
    },
    {
      test: /\.less$/,
      use: withCssHotLoader([MiniCssExtractPlugin.loader, ...lessLoaders]),
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: BABEL_LOADER,
      options: deepAssign({}, babelConfig, { cacheDirectory: true }),
    },

    // extra url loader usage
    {
      test: /\.woff2?$/,
      loader: URL_LOADER,
      options: {
        limit: URL_LOADER_LIMIT,
        minetype: 'application/font-woff',
        name: 'assets/[hash].[ext]',
      },
    },
    {
      test: /\.ttf$/,
      loader: URL_LOADER,
      options: {
        limit: URL_LOADER_LIMIT,
        minetype: 'application/octet-stream',
        name: 'assets/[hash].[ext]',
      },
    },
    {
      test: /\.eot$/,
      loader: URL_LOADER,
      options: {
        limit: URL_LOADER_LIMIT,
        minetype: 'application/vnd.ms-fontobject',
        name: 'assets/[hash].[ext]',
      },
    },
    {
      test: /\.svg$/,
      loader: URL_LOADER,
      options: {
        limit: URL_LOADER_LIMIT,
        minetype: 'image/svg+xml',
        name: 'assets/[hash].[ext]',
      },
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      loader: URL_LOADER,
      options: {
        limit: URL_LOADER_LIMIT,
        name: 'assets/[hash].[ext]',
      },
    },
    {
      test: /\.md$/,
      use: [{
        loader: 'html-loader'
      }, {
        loader: 'markdown-loader',
        options: {},
      }]
    },
  ];
};
