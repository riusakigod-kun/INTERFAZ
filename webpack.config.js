const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { GenerateSW } = require('workbox-webpack-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

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
              ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }],
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
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: isProduction,
    }),
    ...(isProduction ? [
      new WebpackPwaManifest({
        name: 'Mi App Educativa',
        short_name: 'EduApp',
        description: 'Aplicación educativa para estudiantes',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: path.resolve('public/icon-192x192.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            purpose: 'any maskable'
          }
        ]
      }),
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      })
    ] : [])
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
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};