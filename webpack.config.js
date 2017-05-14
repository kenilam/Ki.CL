'use strict';

import path from 'path';

import HtmlWebpack from 'html-webpack-plugin';
import ExtractText from 'extract-text-webpack-plugin';
import OnlyIfChangedWebpack from 'only-if-changed-webpack-plugin';

const fileName = {
    js : 'app.js',
    css : 'style.css'
};
const srcRoot = 'project/src';
const destRoot = 'project/dev';

const opts = {
    rootDir: __dirname,
    devBuild: process.env.NODE_ENV !== 'production',
};

export default {
    devtool : 'source-map',
    entry : [
        `./${srcRoot}/${fileName.js}`,
        `./${srcRoot}/app.scss`
    ],
    output : {
        path : `${opts.rootDir}/${destRoot}`,
        filename : fileName.js,
        pathinfo : opts.devBuild
    },
    module : {
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude : /node_modules/,
                loader : 'babel-loader',
                query : {
                    presets : ['react']
                }
            },
            {
                test : /\.css$/,
                exclude : /node_modules/,
                use : ExtractText.extract({
                    fallback : 'style-loader',
                    use : 'css-loader'
                })
            },
            {
                test : /\.(sass|scss)$/,
                exclude : /node_modules/,
                use : ExtractText.extract({
                    fallback: 'style-loader',
                    use : ['css-loader', 'sass-loader']
                })
            },
            {
                test : /\.(gif|png|jpe?g|svg)$/i,
                use : ['file-loader?name=[path][name].[ext]']
            }
        ]
    },
    plugins : [
        new OnlyIfChangedWebpack({
            cacheDirectory : path.join(process.cwd(), 'tmp/cache'),
            cacheIdentifier : opts
        }),
        new HtmlWebpack({
            inject : true,
            template : `./${srcRoot}/index.html`
        }),
        new ExtractText({
            filename : fileName.css,
            allChunks : true
        })
    ],
    watch : true
};