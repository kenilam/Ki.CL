import webpack from 'webpack';
import webpackMerge from 'webpack-merge';

import colors from 'colors';

import {
  Args
}
from './Utilities';

import {
  clean,
} from './Config';

import {
  devConfig
} from './development.babel';

import {
  browser
} from './Config/prodServer';

const mode = process.env.NODE_ENV || 'production';
const watch = !Args.noWatch;

const config = webpackMerge(devConfig, clean, {
  mode,
  watch
});

const statsHandler = async stats => new Promise(
  (resolve, reject) => {
    const {
      compilation
    } = stats;

    if (compilation.errors.length > 0) {
      reject(compilation.errors);

      console.error(colors.red(compilation.errors));

      return;
    }

    console.log(colors.green("App compiled successfully"));
    resolve(stats);
  }
);

const production = new Promise(
  (resolve, reject) => webpack(
    config,
    (errors, stats) => statsHandler(stats)
    .then(resolve)
    .catch(reject)
  ),
);

process.env.NODE_ENV = mode;

export default production.then(browser);
