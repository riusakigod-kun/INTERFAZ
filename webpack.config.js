const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './index.web.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules(?!\/(@react-navigation|react-native))/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-transform-class-properties',
              '@babel/plugin-transform-object-rest-spread'
            ]
          }
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.jsx', '.json'],
    // Configuración específica para resolver los módulos de React Navigation
    fullySpecified: false,
    fallback: {
      "crypto": false,
      "stream": false,
      "buffer": false
    }
  },
  devServer: {
    static: './public',
    port: 8088,
    historyApiFallback: true,
  },
  // Configuración adicional para manejar módulos ES
  experiments: {
    topLevelAwait: true,
  },
};