"use strict";

var path = require('path');

var webpack = require('webpack');

module.exports = {
  //entrada
  entry: './public/js/app.js',
  output: {
    filename: 'bundle.js',
    // __dirname = directorio actual, creara en public una carpeta dist
    path: path.resolve(__dirname, './public/dist')
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      use: [{
        // para cargar babel
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }]
    }]
  }
};