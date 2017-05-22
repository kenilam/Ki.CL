'use strict';

import autoprefixer from 'autoprefixer';
import path from 'path';

import ExtractText from 'extract-text-webpack-plugin';
import HtmlWebpack from 'html-webpack-plugin';
import OnlyIfChanged from 'only-if-changed-webpack-plugin';
import SassLint from 'sasslint-webpack-plugin';

import { HtmlWebpackRootReplace } from './Lib';

const srcRoot = 'project/src';
const devRoot = 'project/dev';

const entry = {
    index : 'index.html',
    js : 'App.jsx',
    scss : 'App.scss',
};

const out = {
    index : 'index.html',
    js : 'javascript/app.js',
    css : 'stylesheet/app.css'
};

const cacheRoot = 'tmp/cache';

const opts = {
    rootDir: path.resolve(__dirname),
    devBuild: process.env.NODE_ENV !== 'production',
};

export default {
    devtool : 'source-map',
    entry : [
        `./${srcRoot}/${entry.js}`,
        `./${srcRoot}/${entry.scss}`
    ],
    output : {
        filename : `${devRoot}/${out.js}`
    },
    resolve: {
        extensions: ['.js', '.jsx', '.sass', '.scss'],
        alias: {
            '^' : opts.rootDir,
            '~' : `${opts.rootDir}/${srcRoot}`
        }
    },
    module : {
        rules : [
            {
                test : /\.(js|jsx)$/,
                enforce : 'pre',
                exclude: /node_modules/,
                loaders : [
                    'jshint-loader',
                    'babel-loader'
                ]
            },
            {
                test : /\.(sass|scss)$/,
                exclude : /node_modules/,
                use : ExtractText.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader : 'css-loader',
                            options : {
                                importLoaders : 1
                            }
                        },
                        {
                            loader : 'postcss-loader',
                            options : {
                                plugins: loader => [
                                    autoprefixer({
                                        browsers: ['last 2 versions']
                                    })
                                ]
                            }
                        },
                        {
                            loader : 'sass-loader',
                            options : {
                                includePaths : [`${opts.rootDir}/${srcRoot}`]
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins : [
        new OnlyIfChanged({
            cacheDirectory : `${opts.rootDir}/${cacheRoot}`,
            cacheIdentifier : opts
        }),

        new ExtractText({
            filename : `${devRoot}/${out.css}`,
            allChunks : true
        }),
        new SassLint({
            glob : `./${srcRoot}/**/*.s?(a|c)ss`
        }),

        new HtmlWebpack({
            filename: `${devRoot}/${out.index}`,
            template : `./${srcRoot}/${entry.index}`,
            alwaysWriteToDisk: true,
            cache : true,
            hash: true,
            inject : true,
            xhtml: true
        }),
        new HtmlWebpackRootReplace({ replacePath : `../../${devRoot}` })
    ],
    watch : true
};