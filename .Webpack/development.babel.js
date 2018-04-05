import webpackMerge from 'webpack-merge';

import {
    assets,
    bundleAnalyzer,
    devServer,
    clean,
    content,
    entry,
    fonts,
    images,
    indexHTML,
    javascript,
    output,
    resolve,
    stylesheet
} from './Config';

const mode = process.env.NODE_ENV || 'development';

const config = webpackMerge(
    assets,
    bundleAnalyzer,
    devServer,
    clean,
    content,
    entry,
    fonts,
    images,
    indexHTML,
    javascript,
    output,
    resolve,
    stylesheet,
    { mode }
);

process.env.NODE_ENV = mode;

export default config;
