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
        const outputPath = this.compiler.options.output.path;
        const originPath = path.join(outputPath, option.origin);

        if (fs.existsSync(originPath)) {
            const baseDir = __dirname;

            process.chdir(outputPath);

            const symlink = path.join(outputPath, option.symlink);
            const dir = path.dirname(symlink);
            const origin = path.relative(dir, originPath);

            if (!fs.existsSync(dir)) {
                shell.mkdir('-p', dir)
            }

            if (fs.existsSync(symlink)) {
                fs.unlinkSync(symlink);
            }

            fs.symlinkSync(origin, symlink);

            process.chdir(baseDir);
        }
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