import webpackMerge from 'webpack-merge';

import {
    assets,
    bundleAnalyzer,
    devServer,
    clean,
    entry,
    environment,
    fonts,
    images,
    indexHTML,
    javascript,
    output,
    resolve,
    stylesheet
} from './Config';

const mode = process.env.NODE_ENV || 'development';

const basicConfig = webpackMerge(
    assets,
    bundleAnalyzer,
    clean,
    entry,
    environment,
    fonts,
    images,
    indexHTML,
    javascript,
    output,
    resolve,
    stylesheet
);

const config = webpackMerge(basicConfig, devServer, { mode });

process.env.NODE_ENV = mode;

export { basicConfig };

export default config;
