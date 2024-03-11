const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js',
    database: './src/js/database.js',
    editor: './src/js/editor.js',
    header: './src/js/header.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // Webpack plugin that generates our html file and injects our bundles
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'TEL'
    }),
    // Injects our custom service worker
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
    }),
    // Creates a manifest.json file.
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'Text Editor Lite',
      short_name: 'TEL',
      description: 'Text Editor Lite',
      background_color: '#225ca3',
      theme_color: '#225ca3',
      start_url: '/',
      publicPath: '/',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),

  ],

  module: {
    // Rules for handling different file types
    rules: [
      // CSS Loaders
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // JavaScript Loaders
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        // We use babel-loader in order to use ES6.
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
          },
        },
      },
    ],
  },
};
