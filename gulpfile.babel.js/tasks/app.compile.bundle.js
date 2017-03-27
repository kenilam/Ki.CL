'use strict';

import fs from 'fs';

import gulp from 'gulp';
import gulpData from 'gulp-data';
import gulpRename from 'gulp-rename';

import gutil from 'gulp-util';

import changedInPlace from 'gulp-changed-in-place';

import del from 'del';

import jshint from './jshint';
import webpack from './webpack';

const taskName = 'app.compile.bundle';

const src = {
    template: [
        './project/src/**/*.html',
        '!./project/src/index.html',
        '!./project/src/{lib,plugin}/**/*'
    ],
    jsx: [
        './project/src/**/*.jsx',
        '!./project/src/{lib,plugin}/**/*'
    ],
    temp: [
        './project/src/**/*.js',
        '!./project/src/{lib,plugin}/**/*'
    ]
};

const tempDest = './project/src';

const rename = {
    extname : '.js'
};

class Bundle {
    constructor () {
        gulp.task(`${taskName}.cleanup`, Bundle.cleanup);
        gulp.task(taskName, Bundle.task);

        this.taskName = taskName;
    }

    static cleanup () {
        return del(src.temp);
    }

    static lint (file, callback) {
        jshint.reset();

        gulp.src(file.path.replace(global.appFoot, '.'))
            .pipe(jshint.jsxhint())
            .pipe(jshint.notify())
            .pipe(jshint.reporter());

        callback(null, file);
    }

    static insertSecret (file) {
        const secret = require('../../secret');
        const envSecret = secret[process.env.mode || 'dev'];
        const database = `${envSecret.api.servername}:${envSecret.api.proxy}`;

        const filePath = file.path.replace('.html', '.jsx');

        if (!fs.existsSync(filePath)) {
            return { error : new gutil.PluginError(
                taskName,
                `${filePath.replace(global.appRoot, '.')} dos not exists`,
                { showStack: true }
            ) };
        }

        file.contents = new Buffer(fs.readFileSync(filePath).toString().replace(/{database}/g, database));

        return file;
    }

    static insertTemplate (file) {
        const filePath = file.path.replace('.jsx', '.html');

        if (!fs.existsSync(filePath)) {
            return file;
        }

        const template = fs.readFileSync(filePath);

        file.contents = new Buffer(file.contents.toString().replace(/{template}/g, template));

        return file;
    }

    static transpolate (file, callback) {
        const modifiedFile = Bundle.insertSecret(file);

        if (modifiedFile.error) {
            callback(modifiedFile.error);
            return;
        }

        Bundle.insertTemplate(file);

        callback(null, Bundle.insertTemplate(modifiedFile));
    }

    static task (callback) {
        gulp.src([].concat(src.jsx, src.template))
            .pipe(changedInPlace({ firstPass : true }))
            .pipe(gulpData(Bundle.transpolate))
            .pipe(gulpRename(rename))
            .pipe(gulpData(Bundle.lint))
            .pipe(gulp.dest(tempDest))
            .on('end', () => {
                webpack.compile(callback);
            });
    };
}

export default new Bundle();

