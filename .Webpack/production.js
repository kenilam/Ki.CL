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
  browser,
  browserInstance,
  browserSync
} from './Config/prodServer';

const mode = process.env.NODE_ENV || 'production';
const watch = !Args.noWatch;

const config = webpackMerge(devConfig, clean, {
  mode,
  watch
});

const FAILURE_MESSAGE = colors.red('Failures while starting application on production environment');
const SUCCESS_MESSAGE = colors.green('App compiled successfully');

const COLORS = {
  red: '#D8000C',
  yellow: '#9F6000'
}

class StatsReports {
  constructor(reports, color, maxLength = 10) {
    const length = reports.length;
    const extraLength = length - maxLength;
    const concatMessage = `${extraLength} more...`;
    reports = reports.slice(0, maxLength);

    this.results = reports.slice(0, maxLength).map(
      report => ({
        html: `<p style='color:${COLORS[color]}'>${report}</p>`,
        message: colors[color](report)
      })
    );

    if (extraLength > 0) {
      this.results.push({
        html: `<p>${concatMessage}</p>`,
        message: colors[color](concatMessage)
      });
    };

    return this.results;
  }
}

const statsHandler = async stats => new Promise(
  (resolve, reject) => {
    const {
      compilation: {
        errors,
        warnings
      }
    } = stats;

    if (stats.hasErrors()) {
      const errorMessages = new StatsReports(errors.map(({
        message
      }) => message), 'red');

      errorMessages.forEach(({
        message
      }) => console.error(message));

      browserInstance.sockets.emit('fullscreen:message', {
        title: 'Webpack Error:',
        body: errorMessages.map(({
          html
        }) => html).join(''),
        timeout: 100000
      });

      reject(errors);

      return;
    }

    console.log(SUCCESS_MESSAGE);
    resolve(stats);
  }
);

const production = new Promise(
  (resolve, reject) => webpack(
    config,
    (errors, stats) => statsHandler(stats)
    .then(resolve)
    .catch(reject)
  )
);

process.env.NODE_ENV = mode;

export default production.then(browser).catch(errors => {
  console.error(FAILURE_MESSAGE);
  console.error(errors);
});
