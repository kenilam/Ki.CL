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

	interpolate (template) {
		return (file, callback) => {
			let contents = file.contents.toString().replace(/{template}/g, template.contents.toString());

			template.path = file.path.replace('.html', '.js');
			template.contents = new Buffer(esformatter.format(contents));

			callback(null, template);
		}
	}

	transform (file, callback) {
		gulp.src(file.path.replace('.html', '.jsx'))
			.pipe(errorHandler.plumber())
			.pipe(gulpData(this.interpolate(file)))
			.on('finish', () => {
				callback(null, file);
			})
	}

	compile () {
		return gulpData(this.transform.bind(this));
	}
}

export default new Template();