const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './core.js',
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src', 'manifest.json'), to: 'manifest.json' },
        { from: path.resolve(__dirname, 'src', 'popup'), to: 'popup' },
        { from: path.resolve(__dirname, 'src', 'assets'), to: 'assets' },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.DEVELOPMENT': JSON.stringify(process.env.NODE_ENV === 'development'),
    }),
    process.env.NODE_ENV === 'production' && new ZipPlugin({
      filename: 'packed.zip',
    }),
  ].filter((n) => n),
  output: {
    path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? 'dist' : 'dev'),
    filename: 'core.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
      new JsonMinimizerPlugin(),
    ],
  },
};
