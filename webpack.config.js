'use strict';

const autoprefixer =  require('autoprefixer');
const glob =  require('glob');
const fs = require('fs');
const path =  require('path');
const shell = require('shelljs');
const webpack = require('webpack');

const CleanWebpack =  require('clean-webpack-plugin');
const ExtractText =  require('extract-text-webpack-plugin');
const HtmlWebpack =  require('html-webpack-plugin');
const OnlyIfChanged =  require('only-if-changed-webpack-plugin');
const SassLint =  require('sasslint-webpack-plugin');

const Plugin =  require('./Plugin');

const srcRoot = 'project/src';
const devRoot = 'project/dev';

const ext = {
    symlink : [
        'eot',
        'svg',
        'ttf',
        'woff',
        'woff2',
        'otf',
        'png',
        'jpg',
        'gif',
        'ico',
        'svg'
    ]
};

const entry = {
    index : 'index.html',
    js : 'App.jsx',
    scss : 'App.scss',
    symlink : `**/*.{${ext.symlink.join(',')}}`
};

const out = {
    index : 'index.html',
    js : 'javascript/app.js',
    css : 'stylesheet/app.css'
};

const cacheRoot = 'tmp/cache';

const opts = {
    rootDir: path.resolve(__dirname),
    devBuild: process.env.NODE_ENV !== 'production'
};

if (!fs.existsSync(cacheRoot)) {
    shell.mkdir('-p', cacheRoot);
}

module.exports = {
    devtool : 'source-map',
    entry : [
        `./${srcRoot}/${entry.js}`,
        `./${srcRoot}/${entry.scss}`
    ],
    output : {
        path : `/${devRoot}`,
        filename : `${out.js}`
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
                test : /\.jsx$/,
                enforce : 'pre',
                exclude: /node_modules/,
                loaders : [
                    'react-hot-loader/webpack',
                    'jshint-loader',
                    'babel-loader'
                ]
            },
            {
                test : /\.(sass|scss)$/,
                exclude : /node_modules/,
                use : ['css-hot-loader'].concat(ExtractText.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader : 'css-loader',
                            options : {
                                constLoaders : 1
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
                }))
            },
            {
                test : /\.css$/,
                exclude: /node_modules/,
                loaders : [
                    'style-loader'
                ]
            }
        ]
    },
    plugins : [
        new CleanWebpack([
            `./${devRoot}`
        ], {
            watch : true
        }),

        new OnlyIfChanged({
            cacheDirectory : `${opts.rootDir}/${cacheRoot}`,
            cacheIdentifier : opts
        }),

        new ExtractText({
            filename : `${out.css}`,
            allChunks : true
        }),
        new SassLint({
            glob : `./${srcRoot}/**/*.s?(a|c)ss`
        }),

        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpack({
            filename: `${out.index}`,
            template : `./${srcRoot}/${entry.index}`,
            alwaysWriteToDisk: true,
            cache : true,
            hash: false,
            inject : true,
            xhtml: true
        }),
        new Plugin.HtmlWebpackHtmlReplace({
            replacePath : `../../${devRoot}/`
        }),
        new Plugin.Symlink(glob.sync(`./${srcRoot}/${entry.symlink}`).map(
            file => ({
                origin : file,
                symlink : file.replace(srcRoot, devRoot)
            })
        ))
    ],

    watch : true,

    devServer: {
        historyApiFallback : true,
        host : process.env.HOST,
        port : process.env.PORT,
        open : true,
        hot : true,
        inline : true
    }
};