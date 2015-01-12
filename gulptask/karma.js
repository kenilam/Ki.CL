'use strict';
module.exports.karma = function (project, config, gulp) {
    var karma = require('gulp-karma'),
        taskName = project + '.' + 'karma';

    if (!gulp) {
        gulp = require('gulp');
    }

    // grab  and assign all test spec file to Karam
    config.files.push('spec/**/*.js');

    for (var i = 0, l = config.files.length; i < l; i ++) {
        config.files[i] = './project/' + project + '/' + config.files[i];
    }

    gulp.task(taskName, function () {
        gulp
            .src(config.files)
            .pipe(
                karma({
                    configFile : './karma.config.js',
                    action : 'watch'
                })
            )
            .on('error', function (err) {
                throw err;
            });
    });

    return taskName;
}