'use strict';

import colors from 'colors';

import path from 'path';

import gulp from 'gulp';
import gutil from 'gulp-util';

import del from 'del';
import vinylPaths from 'vinyl-paths';

import gulpBatch from 'gulp-batch';
import gulpFilter from 'gulp-filter';
import gulpSassGraph from 'gulp-sass-graph';
import gulpWatch from 'gulp-watch';

import {config as sassConfig} from './sass';

const taskName = 'watch';

class Event {
    constructor () {

    }

    getSrc (event) {
        return event.path
            .replace(global.appRoot, '.')
            .replace('src', 'dev')
            .replace('html', 'template.js')
            .replace('scss', 'css');
    }

    unlink (event, eventActions) {
        const src = this.getSrc(event);

        const map = [src, 'map'].join('.');

        return gulp.src([src, map])
            .pipe(vinylPaths(del))
            .on('finish', () => {
                if (!eventActions) {
                    return;
                }

                return gulp.run.apply(this, eventActions);
            });
    }

    add (event, eventActions) {
        return gulp.run.apply(this, eventActions);
    }
}

class Watch {
    constructor () {
        gulp.task(taskName, this.task.bind(this));

        this.events = new Event();
        this.taskName = taskName;
    }

    action (defaultActions, eventActions) {
        const react = vinyl => {
            const file = vinyl.path.replace(global.appRoot, '.');

            gutil.log(file.magenta, (vinyl.event+'ed').green, '\r\n');
            
            if (!this.events[vinyl.event] || !eventActions) {
                return gulp.run.apply(this, defaultActions);
            }

            return this.events[vinyl.event](vinyl, eventActions[vinyl.event]);
        }

        return react;
    }

    task () {
        gulpWatch(
            ['./project/src/index.html'],
            { name : 'indexWatcher' },
            this.action(
                ['inject.index']
            )
        );

        gulpWatch(
            [
                './project/src/**/*.html',
                '!./project/src/index.html',
                './project/src/**/*.jsx'
            ],
            { name : 'bundleWatcher' },
            this.action(
                ['app.compile.bundle', 'inject.index'],
                {
                    unlink: ['inject.index']
                }
            )
        );

        gulpWatch(
            [
                './project/src/**/*.scss',
                '!./project/src/**/_*.scss'
            ],
            { name : 'scssWatcher' },
            this.action(
                ['app.compile.scss'],
                {
                    add: ['app.compile.scss', 'inject.index']
                }
            )
        );

        gulpWatch(
            [
                './project/src/**/_*.scss'
            ],
            { name : '_imported_scssWatcher' },
            this.action(
                ['app.compile.all.scss'],
                {
                    add: ['app.compile.all.scss', 'inject.index']
                }
            )
        );

        gulpWatch(
            ['./project/src/**/*.{jpg,jpeg,gif,png}'],
            { name : 'imageWatcher' },
            this.action(
                ['app.copy.image']
            )
        );

        gulpWatch(
            ['./project/src/**/*.{eot,svg,ttf,woff,woff2}'],
            { name : 'fontWatcher' },
            this.action(
                ['app.copy.font']
            )
        );
    }
}

export default new Watch();

