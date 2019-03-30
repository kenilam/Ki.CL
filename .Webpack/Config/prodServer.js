import browserSync from 'browser-sync';

import {
  srcRoot as baseDir
} from '!/Config/output';

import {
  Args
} from '!/Utilities';

import {
  localhost
} from '^/ki-cl.config';

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
  hooks: {
    'client:js': `___browserSync___.socket.on('disconnect', function () { window.close(); location.reload(); });`,
  },
};

const browserInstance = browserSync.create();

const browser = () => browserInstance.init(browserConfig);

export {
  browser,
  browserInstance,
  browserSync
};
