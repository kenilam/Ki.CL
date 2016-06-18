'use strict';

import gulp from 'gulp';

import gulpData from 'gulp-data';

import debug from 'gulp-debug';

import esformatter from 'esformatter';
import esformatterJSX from 'esformatter-jsx';

import errorHandler from './errorHandler';

esformatter.register(esformatterJSX);

class Template {
	constructor () {
		return this.compile.bind(this);
	}

	transform (file, callback) {
		gulp.src(file.path.replace('.html', '.jsx'))
			.pipe(errorHandler.plumber())
			.pipe(gulpData((compiledFile, compiledCallback) => {
				const template = compiledFile.contents.toString().replace(/{template}/g, file.contents.toString());
				
				file.path = file.path.replace('.html', '.js');
				file.contents = new Buffer(esformatter.format(template));

				compiledCallback(null, file);
			}))
			.on('finish', () => {
				callback(null, file);
			})
	}

	compile () {
		return gulpData(this.transform);
	}
}

export default new Template();