'use strict'

import path from 'path';

import { argv as args } from 'yargs';

import gulp from 'gulp';
import gutil from 'gulp-util';

import gulpAddsrc from 'gulp-add-src';
import gulpChanged from 'gulp-changed';
import gulpData from 'gulp-data';
import gulpNotify from 'gulp-notify';
import gulpPlumber from 'gulp-plumber';
import gulpRename from 'gulp-rename';
import gulpSourcemaps from 'gulp-sourcemaps';

import debug from 'gulp-debug';

import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

import del from 'del';
import vinylPaths from 'vinyl-paths';

import browserify from './browserify';
import template from './template';
import jshint from './jshint';

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
        gulp.src(src.jsx)
            .pipe(jshint.jsxhint())
            .pipe(jshint.notify())
            .pipe(jshint.reporter())
            .on('finish', callback);
    }

    renameJSX (callback) {
        return () => {
            gutil.log('renaming JXS'.yellow);
            gulp.src(src.jsx)
                .pipe(gulpRename(rename))
                .pipe(gulp.dest(tempDest))
                .on('end', callback);
        }

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

    bundler (callback) {
        return () => {
            gutil.log('browserifying'.yellow);
            browserify(entry, callback)
                .pipe(source(output))
                .pipe(gulp.dest(dest))
                .on('end', callback);
        }
    }

    deleteTempSrc (callback) {
        return () => {
            gutil.log('deleting temporary JS files'.yellow);
            gulp.src(src.temp)
                .pipe(vinylPaths(del));

            callback();
        }
    }

    task (callback) {
        this.renameJSX(
            this.compileTemplate(
                this.bundler(
                    !args.debug ?
                        this.deleteTempSrc(
                            callback
                        )
                    : callback
                )
            )
        )
        ();
    };
}

export default new Bundle();

