'use strict';

import colors from 'colors';

import path from 'path';

import merge from 'merge-stream';

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

class WatchEvents {
    static getSrc (event) {
        return event.path
            .replace(global.appRoot, '.')
            .replace('src', 'dev')
            .replace('html', 'template.js')
            .replace('scss', 'css');
    }

    static unlink (event, eventActions) {
        const src = WatchEvents.getSrc(event);

        return gulp.src([src, `${src}.map`])
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

        this.taskName = taskName;
    }

    action (eventActions) {
        if (!eventActions) {
            eventActions = {};
        }

        return vinyl => {
            if (!WatchEvents[vinyl.event]) {
                return gulp.run.apply(this, eventActions[vinyl.event] || eventActions.default);
            }

            return WatchEvents[vinyl.event](vinyl, eventActions[vinyl.event] || eventActions.default);
        };
    }

    options (options) {
        return Object.assign({}, {
            verbose : true
        }, options)
    }

    task () {
        return merge(
            gulpWatch(
                ['./project/src/index.html'],
                this.options({ name : 'indexWatcher' }),
                this.action({
                    default : ['inject.index']
                })
            ),

            gulpWatch(
                ['./project/src/**/*.html', '!./project/src/index.html', './project/src/**/*.jsx'],
                this.options({ name : 'bundleWatcher' }),
                this.action({
                    default : ['app.compile.bundle']
                })
            ),

            gulpWatch(['./project/src/**/*.php'],
                this.options({ name : 'phpWatcher' }),
                this.action({
                    default : ['app.compile.php']
                })
            ),

            gulpWatch(['./secret.json'],
                this.options({ name : 'secretWatcher' }),
                this.action({
                    default : ['app.compile.all.php', 'app.compile.bundle']
                })
            ),

            gulpWatch(['./project/src/**/*.scss', '!./project/src/**/_*.scss'],
                this.options({ name : 'scssWatcher' }),
                this.action({
                    default : ['app.compile.scss', 'inject.index'],
                    change : ['app.compile.scss']
                })
            ),

            gulpWatch(['./project/src/**/_*.scss'],
                this.options({ name : '_imported_scssWatcher' }),
                this.action({
                    default : ['app.compile.all.scss', 'inject.index'],
                    change: ['app.compile.all.scss']
                })
            ),

            gulpWatch(['./project/src/**/*.{jpg,jpeg,gif,png}'],
                this.options({ name : 'imageWatcher' }),
                this.action({
                    default : ['app.copy.component.image']
                })
            ),

            gulpWatch(
                ['./project/src/**/*.{eot,svg,ttf,woff,woff2}'],
                this.options({ name : 'fontWatcher' }),
                this.action({
                    default : ['app.copy.component.font']
                })
            ),

            gulpWatch(
                ['./project/src/**/*.{json}'],
                this.options({ name : 'dataWatcher' }),
                this.action({
                    default : ['app.copy.component.data', 'inject.index']
                })
            )
        );
    }
}

export default new Watch();

