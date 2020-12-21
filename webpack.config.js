/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = ({ API_ENV, DEBUG_MODE, BUILD_DIR, PUBLIC_DIR }) => {
  const outputDir = path.join(__dirname, BUILD_DIR || './build');
  const publicDir = path.join(outputDir, PUBLIC_DIR || './public');
  return {
    entry: {
      index: './src/index.ts',
    },
    output: {
      path: outputDir,
      filename: `api.bundle.js`,
    },
    ignoreWarnings: [
      {
        module: RegExp('node_modules/express/lib/view.js'), // A RegExp
      },
      {
        module: RegExp('./node_modules/require_optional/*'), // A RegExp
      },
      {
        module: RegExp('node_modules/mongo*'), // A RegExp
      },
    ],
    stats: {
      warnings: true,
      assets: false,
      modules: false,
      hash: false,
      version: false,
      entrypoints: false,
      builtAt: false,
      timings: false,
    },

    target: 'node',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false, // if you don't put this is, __dirname
      __filename: false, // and __filename return blank or /
    },
    devtool: DEBUG_MODE === 'enabled' ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new webpack.IgnorePlugin(/^pg-native$/),
      new CleanWebpackPlugin(),
      new NodemonPlugin({
        nodeArgs: [DEBUG_MODE === 'enabled' ? '--inspect' : ''],
      }), // Dong
      new webpack.DefinePlugin({
        'process.env.API_ENV': JSON.stringify(API_ENV),
        'process.env.PUBLIC_DIR': JSON.stringify(PUBLIC_DIR),
        'process.env.DEBUG_MODE': JSON.stringify(DEBUG_MODE),
      }),
      new FileManagerPlugin({
        onEnd: {
          copy: [
            //{ source: './src/locales/*.json', destination: `${outputDir}/locales` },
            { source: '.env*', destination: outputDir },
            { source: '*.ico', destination: publicDir },
          ],
        },
      }),
      new ESLintPlugin({
        extensions: ['ts'],
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        '@application': path.resolve(__dirname, 'src/application'),
        '@locales': path.resolve(__dirname, 'src/locales'),
        '@system': path.resolve(__dirname, 'src/system'),
      },
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          parallel: true,
          terserOptions: {
            keep_fnames: true,
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
  };
};
