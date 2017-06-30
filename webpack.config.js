'use strict';

const autoprefixer =  require('autoprefixer');
const fs = require('fs');
const path =  require('path');
const shell = require('shelljs');
const webpack = require('webpack');

const Bourbon = require('bourbon');
const CleanWebpack =  require('clean-webpack-plugin');
const ExtractText =  require('extract-text-webpack-plugin');
const HtmlWebpack =  require('html-webpack-plugin');
const OnlyIfChanged =  require('only-if-changed-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const stylishReporter = require('jshint-loader-stylish');

const Plugin =  require('./Plugin');

const srcRoot = 'project/src';
const devRoot = 'project/dev';

const entry = {
    index : 'index.html',
    js : 'App.jsx',
    scss : 'App.scss',
    symlink : `**/*.{eot,svg,ttf,woff,woff2,otf,png,jpg,gif,ico,svg}`
};

const out = {
    index : 'index.html',
    js : 'app.js',
    css : 'app.css'
};

const cacheRoot = 'tmp/cache';

const opts = {
    rootDir : path.resolve(__dirname),
    devBuild : process.env.NODE_ENV !== 'production'
};

const node_modules = `${opts.rootDir}/node_modules/`;

function assetLoader (test, options) {
    return {
        test: test,
        use : [
            {
                loader : 'file-loader',
                options  : Object.assign({
                    name : '[path][name].[ext]'
                }, options)
            }
        ]
    };
}

if (fs.existsSync(cacheRoot)) {
    fs.readdirSync(cacheRoot).forEach(
        file => fs.unlinkSync(`${cacheRoot}/${file}`)
    );
} else {
    shell.mkdir('-p', cacheRoot);
}

module.exports = {
    devtool : 'source-map',
    context : `${opts.rootDir}/${srcRoot}`,
    entry : [
        `./${entry.js}`,
        `./${entry.scss}`,
        `/${opts.rootDir}/.stylelintrc`,
        `/${opts.rootDir}/.jshintrc`,
        `/${opts.rootDir}/.babelrc`
    ],
    output : {
        path : `${opts.rootDir}/${devRoot}`,
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
                use: [
                    {
                        loader : 'jshint-loader',
                        options : {
                            reporter : stylishReporter()
                        }
                    },
                    {
                        loader : 'babel-loader'
                    }
                ]
            },

            {
                test : /\.(css|sass|scss)$/,
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
                            loader : 'fast-sass-loader',
                            options : {
                                includePaths : [
                                    `${node_modules}`,
                                    `${opts.rootDir}/${srcRoot}`,
                                    `${opts.rootDir}/${srcRoot}/Lib/Style`
                                ]
                            }
                        }
                    ]
                }))
            },

            {
                test: /\.glsl$/,
                loader: 'webpack-glsl-loader'
            },

            {
                test: /\.?rc$/,
                use: 'rc-exports-loader'
            },

            assetLoader(/\.(gif)$/i, { mimetype : 'image/gif' }),
            assetLoader(/\.(jpe?g)$/i, { mimetype : 'image/pjpeg' }),
            assetLoader(/\.(png)$/i, { mimetype : 'image/png' }),

            assetLoader(/\.svg$/, { mimetype : 'image/svg+xml' }),
            assetLoader(/\.woff$/, { mimetype : 'application/font-woff' }),
            assetLoader(/\.woff2$/, { mimetype : 'application/font-woff2' }),
            assetLoader(/\.[ot]tf$/, { mimetype : 'application/octet-stream' }),
            assetLoader(/\.eot$/, { mimetype : 'application/vnd.ms-fontobject' })
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

        new StyleLintPlugin({
            configFile : `${opts.rootDir}/.stylelintrc`
        }),

        new HtmlWebpack({
            filename: `${out.index}`,
            template : `./${entry.index}`,
            alwaysWriteToDisk: true,
            cache : true,
            hash: false,
            inject : true,
            xhtml: true
        }),

        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
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