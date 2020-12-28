import browserSync from 'browser-sync';
import colors from 'colors';

import { srcRoot as baseDir } from '!/Config/output';
import { Args, Env, Logger, Uuid } from '!/Utilities';

import middleware from './middleware';

const { HOST: host, PORT: port } = Env;

const mode = process.env.NODE_ENV || 'production';
const watch = !Args.noWatch;
const debug = !!Args.debug;

const FAILURE_MESSAGE = colors.red(
  `Failures while starting application on ${mode} environment`
);
const SUCCESS_MESSAGE = colors.green('App compiled successfully');

const COLORS = {
  red: '#d8000c',
  yellow: '#9f6000',
};

const DEFAULT_CONFIG = {
  name: 'Ki.CL',
  logPrefix: 'Ki.CL',
  host,
  port,
  snippetOptions: {
    rule: {
      match: /<\/script>/i,
      fn: function (snippet, match) {
        return snippet.replace('id=', `nonce="${Uuid.nonce}" `) + match;
      }
    }
  },
  ui: false,
  middleware
}

const DEBUG_CONFIG = (
  debug ? {
    logConnections: true,
    plugins: ['bs-fullscreen-message'],
    reloadDelay: 0,
    reloadDebounce: 500,
    hooks: {
      'client:js': `___browserSync___.socket.on('disconnect', function () { window.close(); location.reload(); });`,
    },
    watch,
    ui: {
      port: parseInt(port) + 1,
      weinre: {
        port: parseInt(port) + 2
      }
    },
    notify: true,
    codeSync: true,
    logFileChanges: true,
    logSnippet: true,
  }: {}
)

const BROWSER_CONFIG = {
  ...DEFAULT_CONFIG,
  startPath: '',
  open: false,
  server: {
    baseDir,
    directory: debug,
  },
  ui: false,
  ghostMode: false,
  https: false,
  notify: false,
  codeSync: false,
  logFileChanges: false,
  ...DEBUG_CONFIG,
};

class StatsReports {
  constructor(reports, color, maxLength = 10) {
    const length = reports.length;
    const extraLength = length - maxLength;
    const concatMessage = `${extraLength} more...`;

    reports = reports.slice(0, maxLength);

    this.results = reports.slice(0, maxLength).map((report) => ({
      html: `<p style='color:${COLORS[color]}'>${report}</p>`,
      message: colors[color](report),
    }));

    if (extraLength > 0) {
      this.results.push({
        html: `<p>${concatMessage}</p>`,
        message: colors[color](concatMessage),
      });
    }

    return this.results;
  }
}

const errorHandler = (errors) => {
  Logger.error(FAILURE_MESSAGE);
  Logger.error(errors);
}

const statsHandler = async (stats) => (
  new Promise((resolve, reject) => {
    let errorMessages;

    const {
      compilation: { errors },
    } = stats;

    if (stats.hasErrors()) {
      errorMessages = new StatsReports(
        errors.map(({ message }) => message),
        'red'
      );

      errorMessages.forEach(({ message }) => Logger.error(message));

      instance.sockets.emit('fullscreen:message', {
        title: 'Webpack Error:',
        body: errorMessages.map(({ html }) => html).join(''),
        timeout: 100000,
      });

      reject(errors);

      return;
    }

    Logger.log(SUCCESS_MESSAGE);
    resolve(stats);
    return;
  })
);

const instance = browserSync.create();

const launch = () => {
  if (Args.noBrowser) {
    process.exit(0);
  }

  return instance.init(BROWSER_CONFIG);
}

export { errorHandler, launch, statsHandler };
