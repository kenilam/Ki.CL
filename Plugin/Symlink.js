'use strict';

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

class Symlink {
    constructor() {
        const config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        this.options = void 0;

        if (config instanceof Array) {
            this.options = config;
        } else {
            this.options = [config];
        }
    }

    makeSymlinks(option) {
        if (!fs.existsSync(option.origin)) {
            return;
        }

        option.symlink = option.symlink.replace('./', '');
        option.origin = option.origin.replace('./', '');

        process.chdir(path.resolve(__dirname).replace('Plugin', ''));

        const dir = path.dirname(option.symlink);

        if (!fs.existsSync(dir)) {
            shell.mkdir('-p', dir)
        }

        if (fs.existsSync(option.symlink)) {
            fs.unlink(option.symlink);
        }

        const relativePath = path.relative(option.symlink, option.origin);

        fs.symlinkSync(relativePath, option.symlink);

        process.chdir(path.resolve(__dirname));
    }

    afterEmit (compilation, callback) {
        this.options.forEach(this.makeSymlinks.bind(this));

        callback();
    }

    apply (compiler) {
        this.compiler = compiler;
        compiler.plugin('after-emit', this.afterEmit.bind(this));
    }
}

module.exports = Symlink;