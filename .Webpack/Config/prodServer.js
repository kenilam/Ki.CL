import browserSync from 'browser-sync';

import { devTool } from '!/Config/devServer';
import { srcRoot as outSrcRoot } from '!/Config/output';

import { Args } from '!/Utilities';

import config from '^/ki-cl.config.json';

let startPath = '';

const browserConfig = {
    browser : config.localhost.browser,

    files : [ `${outSrcRoot}/**/*` ],

    logConnections : true,
    logPrefix : config.name,
    open : !Args.noBrowser,
    port : config.localhost.port,
    reloadDelay : 0,
    reloadDebounce: 500,

    server : {
        baseDir : outSrcRoot,
        directory : true
    },

    hooks: {
        'client:js': `___browserSync___.socket.on('disconnect', function () { window.close(); location.reload(); });`
    },

    ui : config.localhost.ui,

    startPath
};

const browserInstance = browserSync.create();

const browser = () => browserInstance.init(browserConfig);

export { browser }
