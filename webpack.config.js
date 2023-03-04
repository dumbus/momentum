const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })]
  },
  entry: './js/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'momentum'),
  },
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, 'momentum'),
    open: true,
    compress: true,
    hot: true,
    port: 3000
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      minify: false,
      inject: false
    }),
    new MiniCssExtractPlugin({
      filename: './style.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'momentum/assets')
        }
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {sources: false, minimize: false}
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader',
            options: {url: false}
          },
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {url: false}
          }, 
          'sass-loader'
        ]
      },
    ]
  }
};