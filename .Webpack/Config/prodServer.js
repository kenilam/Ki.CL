import browserSync from 'browser-sync';
import colors from 'colors';
import { srcRoot as baseDir } from '!/Config/output';
import { Args, Env, Logger } from '!/Utilities';

const { HOST: host, PORT: port } = Env;

const mode = process.env.NODE_ENV || 'production';
const watch = !Args.noWatch;

const FAILURE_MESSAGE = colors.red(
  `Failures while starting application on ${mode} environment`
);
const SUCCESS_MESSAGE = colors.green('App compiled successfully');

const COLORS = {
  red: '#d8000c',
  yellow: '#9f6000',
};

const DEFAULT_CONFIG = {
  name: 'Tesla Grid',
  localhost: {
    logPrefix: 'Grid',
    host,
    port,
    ui: {
      port: port + 1,
      weinre: {
        port: port + 2
      }
    }
  },
}

const BROWSER_CONFIG = {
  ...DEFAULT_CONFIG,
  startPath: '',
  // files: [`${baseDir}/**/*`],
  logConnections: true,
  open: true,
  plugins: ['bs-fullscreen-message'],
  reloadDelay: 0,
  reloadDebounce: 500,
  server: {
    baseDir,

    directory: true,
  },
  https: true,
  hooks: {
    'client:js': `___browserSync___.socket.on('disconnect', function () { window.close(); location.reload(); });`,
  },
  watch,
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

      browserInstance.sockets.emit('fullscreen:message', {
        title: 'Webpack Error:',
        body: errorMessages.map(({ html }) => html).join(''),
        timeout: 100000,
      });

      reject(errors);

      return;
    }

    Logger.log(SUCCESS_MESSAGE);
    resolve(stats);
  })
);

const instance = browserSync.create();

const launch = () => (
  Args.noBrowser
    ? Promise.resolve()
    : instance.init(BROWSER_CONFIG)
);

export { errorHandler, launch, statsHandler };
