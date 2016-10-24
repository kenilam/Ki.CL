'use strict'

import path from 'path';

import gulp from 'gulp';
import gutil from 'gulp-util';

import gulpData from 'gulp-data';
import gulpChanged from 'gulp-changed';

import debug from 'gulp-debug';

import phplint from 'gulp-phplint';

import errorHandler from './errorHandler';

const lintTaskName = 'app.compile.php.lint';
const taskName = 'app.compile.php';

const config = {
    lint : 'fail'
}

const src = [
    './project/src/**/*.php'
]

const dest = './project/dev';

class Php {
    constructor () {
        gulp.task(lintTaskName, this.lint.bind(this));
        
        gulp.task(taskName, [lintTaskName], this.task.bind(this));

        gulp.task(taskName.replace('php', 'all.php'), this.all.bind(this));

        this.taskName = taskName;
    }

    lint (callback) {
        return gulp.src(src)
            .pipe(gulpChanged(dest))
            .pipe(phplint())
            .pipe(phplint.reporter(config.lint));
    }

    getSecret () {
        return require('../../secret')[process.env.mode || 'dev'];
    }

    replaceSecret () {
        let secret = this.getSecret();

        let results = ['<?', 'class'];

        Object.keys(envSecret).forEach(className => {
            let classValue = envSecret[className];

            results.push(`${className}Class`, '{');

            Object.keys(classValue).forEach(varName => {
                results.push('public');
                results.push(`$${varName}`);
                results.push('=');
                results.push(`"${classValue[varName]}";`);
            });

            results.push('function');
            results.push('getValue($name)');
            results.push('{');
            results.push('return');
            results.push('$this->$name;');
            results.push('}');

            results.push('};');
            results.push(`$${className}`);
            results.push('=');
            results.push('new');
            results.push(`${className}Class;`);

            Object.keys(classValue).forEach(varName => {
                results.push(`$${varName}Name`);
                results.push('=');
                results.push(`"${varName}";`);
                results.push(`define("SECRET_${className.toUpperCase()}_${varName.toUpperCase()}"`);
                results.push(',');
                results.push(`$${className}`);
                results.push('->');
                results.push(`{$${varName}Name});`);
            });

            results.push('?>');
        });

        return results.join(' ');
    }

    interpolate (file, callback) {
        let secret = this.getSecret();

        let contents = file.contents.toString().replace(/{secret}/g, this.getSecret());

        Object.keys(secret.api).forEach(name => {
            contents = contents.replace(new RegExp(`{${name}}`, 'g'), secret.api[name]);
        });

        file.contents = new Buffer(contents);

        callback(null, file);
    }

    all () {
        return gulp.src(src)
            .pipe(gulpData(this.interpolate.bind(this)))
            .pipe(gulp.dest(dest))
            .pipe(global.browserSync.stream());
    }

    task () {
        return gulp.src(src)
            .pipe(gulpData(this.interpolate.bind(this)))
            .pipe(gulpChanged(dest))
            .pipe(gulp.dest(dest))
            .pipe(global.browserSync.stream());
    };
}

export default new Php();

