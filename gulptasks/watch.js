'use strict';

import colors from 'colors';

import path from 'path';

import gulp from 'gulp';
import gutil from 'gulp-util';

import del from 'del';
import vinylPaths from 'vinyl-paths';

import gulpWatch from 'gulp-watch';
import gulpBatch from 'gulp-batch';
import gulpFilter from 'gulp-filter';

const taskName = 'watch';

class Event {
    constructor () {

    }

    unlink (event, eventActions) {
        const src = event.path
            .replace(global.appRoot, '.')
            .replace('src', 'dev')
            .replace('html', 'template.js')
            .replace('scss', 'css');

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
            
            if (!this.events[vinyl.event] || eventActions) {
                return gulp.run.apply(this, defaultActions);
            }

            return this.events[vinyl.event](vinyl, eventActions[vinyl.event]);
        }

        return react;
    }

    task () {
        gulpWatch(
            [
                './project/src/**/*.html',
                '!./project/src/index.html',
                './project/src/**/*.jsx'
            ],
            { name : 'javascriptWatcher' },
            this.action(
                ['app.compile.bundle', 'inject.index'],
                {
                    unlink: ['inject.index']
                }
            )
        );

        gulpWatch(
            [
                './project/src/**/*.scss'
            ],
            { name : 'scssWatcher' },
            this.action(
                ['app.compile.scss', 'inject.index']
            )
        );

        gulpWatch(
            ['./project/src/index.html'],
            { name : 'indexWatcher' },
            this.action(
                ['inject.index']
            )
        );
    }
}

export default new Watch();

