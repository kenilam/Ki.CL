'use strict';
module.exports.library = function (project, destination, dependentTasks, gulp) {
    var taskName = project + '.library',

        bowerSrc = require('gulp-bower-src'),
        changed = require('gulp-changed'),
        clean = require('gulp-clean'),
        filter = require('gulp-filter'),
        rename = require('gulp-rename'),
        addsrc = require('gulp-add-src'),
        debug = require('gulp-debug'),

        file = {
            component: {
                JS: [
                    '**/*.js',
                    'dist/*.js',
                    '!*.min.js',
                    '!*-min.js',
                    '!**/*.min.js',
                    '!**/*-min.js',
                    '!**/dist/*.min.js',
                    '!**/dist/*-min.js',
                    '!**/{test,min,bin,lang,lib,support,src,locale,benchmarks,scripts,feature-detects}/**/*.js',
                    '!**/{grunt,Gruntfile,GruntFile,test,export}.js',
                    '**/src/uncompressed/**/*.js'
                ],
                LESS: [
                    '**/*.{less,css}',
                    '**/css/*.css',
                    '!**/*.min.{less,css}',
                    '!**/css/*.min.css',
                    '!**/{support,src,test}/**/*.css',
                    '!font-awesome/{less,src}/**/*.{less,css}'
                ],
                font: '**/fonts/*.{eot,svg,ttf,woff,woff2,otf}'
            },
            plugin: {
                JS: [ './plugin/**/*.js' ],
                LESS: [ './plugin/**/*.{less,css}' ]
            }
        },

        dir = {
            component: {
                JS: destination + '/lib',
                LESS: destination + '/less/lib',
                font: destination + '/less/fonts'
            },
            plugin: {
                JS: destination + '/lib',
                LESS: destination + '/less/lib'
            },
            template: {
                HTML : ['./project/src/{partial,view}/**/*.html']
            }
        };
    
    if (!gulp) {
        gulp = require('gulp');
    }

    gulp.task(taskName + '.clean', dependentTasks, function () {
        return gulp.src([
            dir.component.font,
            dir.component.LESS,
            dir.component.JS
        ]).pipe(clean());
    });

    gulp.task(taskName + '.copy.component.font', [taskName + '.clean'], function () {
        return bowerSrc()
            .pipe(filter(file.component.font))
            .pipe(changed(dir.component.font))
            .pipe(
                rename(function (path) {
                    path.dirname = '.';
                })
            )
            .pipe(gulp.dest(dir.component.font))
    });

    gulp.task(taskName + '.copy.component.LESS', [taskName + '.clean'], function () {
        return bowerSrc()
            .pipe(filter(file.component.LESS))
            .pipe(changed(dir.component.LESS))
            .pipe(
                rename(function (path) {
                    path.dirname = '.';
                    path.extname = '.less';
                })
            )
            .pipe(gulp.dest(dir.component.LESS));
    });
    
    gulp.task(taskName + '.copy.component.JS', [taskName + '.clean'], function () {
        return bowerSrc()
            .pipe(filter(file.component.JS))
            .pipe(changed(dir.component.JS))
            .pipe(
                rename(function (path) {
                    if (path.dirname.indexOf('GreenSock') > -1) {
                        path.dirname = path.dirname.replace('GreenSock-js/src/uncompressed', 'greensock');
                    } else {
                        path.dirname = '.';
                    }
                })
            )
            .pipe(gulp.dest(dir.component.JS));
    });

    gulp.task(taskName + '.copy.plugin.JS', [taskName + '.clean'], function () {
        return gulp.src(file.plugin.JS)
            .pipe(
                rename(function (path) {
                    path.dirname = '.';
                })
            )
            .pipe(gulp.dest(dir.component.JS));
    });

    gulp.task(taskName + '.copy.plugin.LESS', [taskName + '.clean'], function () {
        return gulp.src(file.plugin.LESS)
            .pipe(
                rename(function (path) {
                    if (path.basename === 'lesshat') {
                        path.basename = '_lesshat';
                        path.dirname = '../';
                    } else {
                        path.dirname = '.';
                    }
                })
            )
            .pipe(gulp.dest(dir.component.LESS));
    });

    gulp.task(taskName + '.copy', [
        taskName + '.copy.component.font',
        taskName + '.copy.component.LESS',
        taskName + '.copy.component.JS',
        taskName + '.copy.plugin.LESS',
        taskName + '.copy.plugin.JS'
    ]);

    gulp.task(taskName, [taskName + '.copy']);

    return taskName;
};
