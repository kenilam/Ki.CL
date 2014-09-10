'use strict';
module.exports.template = function (project, environment, destination, dependentTasks, gulp, watch) {
    if (!gulp) {
        gulp = require('gulp');
    }

    var ngTemplate = require('gulp-templatecache'),

        template = {
            HTML : [
                './project/' + project + '/src/**/**/*.html',
                '!./project/' + project + '/src/index.html'
            ],

            destination : './project/' + project + '/' + destination + '/automation'
        },

        fn = {
            template: function () {
                return gulp.src(template.HTML)
                    .pipe(ngTemplate({
                        output: 'run.template.js',
                        strip: __dirname.substr(0, __dirname.length - 8) + 'project/' + project + '/src/',
                        minify: {},
                        moduleName: project
                    }))
                    .pipe(gulp.dest(template.destination))
            }
        },

        taskName = {
            normal : project + '.' + environment + '.template'
        };

    gulp.task(taskName.normal, [dependentTasks], function () {
        return fn.template();
    });

    if (watch) {
        taskName.changed = project + '.' + environment + '.changed.template';

        gulp.task(taskName.changed, function () {
            return fn.template();
        });
    };

    return taskName;
};
