import webpack from 'webpack';
import webpackMerge from 'webpack-merge';

import { Args } from './Utilities';

import { devConfig } from './development.babel';

import { browser } from './Config/prodServer';

const mode = process.env.NODE_ENV || 'production';
const watch = !Args.noWatch;

const config = webpackMerge(devConfig, { mode, watch });

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

const statsHandler = async (error, stats) =>
    new Promise((resolve, reject) => {
        if (errorHandler(error)) {
            reject(error);

            return;
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
