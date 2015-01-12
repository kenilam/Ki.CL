'use strict';
module.exports.bower = function (gulp) {
    var taskName = 'bower',

        bower = require('gulp-bower'),
        clean = require('gulp-clean'),
        bowerSrc = require('gulp-bower-src'),
        debug = require('gulp-debug');
    
    if (!gulp) {
        gulp = require('gulp');
    }

    gulp.task('bower.clean', function () {
        return function () {
            try {
                return bowerSrc().pipe(clean());
            } catch (e) {
                return true;
            }
        }
    });

    gulp.task(taskName + '.get', ['bower.clean'], function () {
        return bower();
    });

    gulp.task(taskName + 'bower', ['bower.clean', 'bower.get']);

    return taskName;
};