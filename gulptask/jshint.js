'use strict';
module.exports.jshint = function (project, gulp) {
    var jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    if (!gulp) {
        gulp = require('gulp');
    }

    gulp.task(project + '.jshint', function() {
        return gulp.src('./project/' + project + '/src/{api,app}/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter('fail'));
    });

    return project + '.jshint';
}