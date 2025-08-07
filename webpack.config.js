const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// Detectar modo producción de múltiples fuentes
const isProduction = process.env.NODE_ENV === 'production' || 
                    process.argv.includes('--mode=production');

module.exports = {
  entry: './index.web.js',
  mode: isProduction ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[contenthash].js' : 'bundle.js',
    publicPath: '/',
    clean: true,
  },
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
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
    host: '0.0.0.0',
    allowedHosts: 'all',
  },
  experiments: {
    topLevelAwait: true,
  },
};