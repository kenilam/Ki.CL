import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { clean, resolve as resolveConfig } from './Config';
import { basic } from './development.babel';
import { Args } from './Utilities';
import { errorHandler, launch, statsHandler } from './Config/prodServer';

const mode = process.env.NODE_ENV || 'production';
const watch = !Args.noWatch;
const additional = {
  mode,
  resolve: resolveConfig,
  watch,
};

const config = merge(basic, clean, additional);

const production = new Promise(
  (resolve, reject) => (
    webpack(
      config,
      (errors, stats) => statsHandler(stats).then(resolve).catch(reject)
    )
  )
);

process.env.NODE_ENV = mode;

export default production.then(launch).catch(errorHandler);
