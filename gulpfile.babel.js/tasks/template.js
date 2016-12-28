'use strict';

import fs from 'fs';
import gulp from 'gulp';

import gulpData from 'gulp-data';

import debug from 'gulp-debug';

import esformatter from 'esformatter';
import esformatterJSX from 'esformatter-jsx';

import errorHandler from './errorHandler';

esformatter.register(esformatterJSX);

class Template {
	constructor () {}

	static interpolate (file, callback) {
        fs.readFile(file.path.replace('.jsx', '.html'), (err, data) => {
            if (!err) {
                const template = data.toString();

                const contents = file.contents.toString().replace(/{template}/g, template);

                file.contents = new Buffer(contents);
            }

            callback(null, file);
        });
	}

	inject (file, callback) {
		gulp.src(file.path.replace('.html', '.jsx'))
			.pipe(errorHandler.plumber())
			.pipe(gulpData(Template.interpolate))
            .pipe(gulpData((transformedFile) => callback(null, transformedFile)));
	}
}

export default new Template();