import { srcRoot as baseDir } from '!/Config/output';
import { Args } from '!/Utilities';
import { localhost } from '^/ki-cl.config';
import browserSync from 'browser-sync';

const startPath = '';

const browserConfig = {
  ...localhost,
  startPath,
  // files: [`${baseDir}/**/*`],
  logConnections: true,
  open: !Args.noBrowser,
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
};

const browserInstance = browserSync.create();

const browser = () => browserInstance.init(browserConfig);

export { browser, browserInstance, browserSync };
