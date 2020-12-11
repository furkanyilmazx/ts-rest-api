"use strict";
/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = ({ API_ENV, DEBUG_MODE, BUILD_DIR }) => {
    const outputDir = path.join(__dirname, BUILD_DIR || './build');
    return {
        entry: {
            index: './src/index.ts',
        },
        output: {
            path: outputDir,
            filename: `[name].${API_ENV}.bundle.js`,
        },
        ignoreWarnings: [
            {
                module: RegExp('node_modules/express/lib/view.js'),
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
            __dirname: false,
            __filename: false,
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
            }),
            new webpack.DefinePlugin({
                'process.env.API_ENV': JSON.stringify(API_ENV),
                'process.env.DEBUG_MODE': JSON.stringify(DEBUG_MODE),
            }),
            new FileManagerPlugin({
                onEnd: {
                    copy: [
                        { source: './src/locales', destination: `${outputDir}/locales` },
                        { source: '.env*', destination: `${outputDir}` },
                        { source: '*.ico', destination: `${outputDir}/public` },
                    ],
                },
            }),
            new ESLintPlugin({
                extensions: ['ts'],
            }),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@project': path.resolve(__dirname, 'src'),
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
