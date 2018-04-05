import webpack from 'webpack';
import webpackMerge from 'webpack-merge';

import { Args } from './Utilities';

import dev from './development.babel';

import { browser } from './Config/prodServer';

const mode = process.env.NODE_ENV || 'production';
const watch = !Args.noWatch;

const config = webpackMerge(dev, { mode, watch });

const errorHandler = error => {
    if (!error) {
        return;
    }

    console.error(error.stack || error);

    if (error.details) {
        console.error(error.details);
    }

    return true;
};

const statsHandler = (error, stats) =>
    new Promise((resolve, reject) => {
        if (errorHandler(error)) {
            reject(error);
        }

        resolve(stats);
    });

const production = new Promise((resolve, reject) =>
    webpack(config, (error, stats) =>
        statsHandler(error, stats)
            .then(resolve)
            .catch(reject)
    )
);

process.env.NODE_ENV = mode;

export default production.then(browser).catch(errorHandler);
