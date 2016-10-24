'use strict'

import path from 'path';

import { argv as args } from 'yargs';

import gulp from 'gulp';
import gutil from 'gulp-util';

import gulpAddsrc from 'gulp-add-src';
import gulpChanged from 'gulp-changed';
import gulpData from 'gulp-data';
import gulpRename from 'gulp-rename';

import debug from 'gulp-debug';

import source from 'vinyl-source-stream';

import del from 'del';

import browserify from './browserify';
import template from './template';
import jshint from './jshint';
import webpack from './webpack';

import errorHandler from './errorHandler';

const lintTaskName = 'app.compile.bundle.lint';
const taskName = 'app.compile.bundle';

const entry = './project/src/app.js';
const dest = './project/dev';
const output = 'app.bundle.js';

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
}

const tempDest = './project/src';

const rename = {
    extname : '.js'
}

class Bundle {
    constructor () {
        gulp.task(lintTaskName, this.lint.bind(this));
        gulp.task(taskName, [lintTaskName], this.task.bind(this));

        this.taskName = taskName;
    }

    lint (callback) {
        return gulp.src(src.jsx)
            .pipe(jshint.jsxhint())
            .pipe(jshint.notify())
            .pipe(jshint.reporter());
    }

    compileTemplate (callback) {
        return () => {
            gutil.log('compiling templates'.yellow);
            gulp.src(src.template)
                .pipe(template())
                .pipe(gulpRename(rename))
                .pipe(gulp.dest(tempDest))
                .on('end', callback);
        }
    }

    bundle (callback) {
        return () => {
            gutil.log('webpacking'.yellow);
            webpack(entry, output)

            // gutil.log('browserifying'.yellow);
            // browserify(entry)
            //     .pipe(source(output))

                .pipe(gulp.dest(dest))
                .on('end', callback);
        }
    }

    interpolateBundle (file, callback) {
        let secret = require('../../secret');
        let envSecret = secret[process.env.mode || 'dev'];
        let database = `${envSecret.api.servername}:${envSecret.api.proxy}`;

        const contents = file.contents.toString()
            .replace(/{database}/g, database);

        file.contents = new Buffer(contents);
        
        callback(null, file);
    }

    createTempSrc (callback) {
        return () => {
            gutil.log('renaming JSX'.yellow);
            gulp.src(src.jsx)
                .pipe(gulpData(this.interpolateBundle))
                .pipe(gulpRename(rename))
                .pipe(gulp.dest(tempDest))
                .on('end', callback);
        }
    }

    deleteTempSrc (callback) {
        return () => {
            gutil.log('deleting temporary JS files'.yellow);
            
            del(src.temp).then(paths => {
                callback();
            });
        }
    }

    task (callback) {
        this.createTempSrc(
            this.compileTemplate(
                this.bundle(
                    !args.debug ?
                        this.deleteTempSrc(
                            callback,
                            errorHandler.notify
                        )
                    : callback
                )
            )
        )();
    };
}

export default new Bundle();

