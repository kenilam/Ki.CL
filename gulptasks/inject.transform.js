'use strict';

import path from 'path';

import gulp from 'gulp';

class Babel {
	constructor () {
		return this.transform.bind(this);
	}

	transform (filePath) {
		let type = 'script';
		let attr = 'type="text/javascript"';
		let link = 'src';

		let url = filePath.replace(global.appRoot, '').replace('/project/dev', '');
		
		if (path.extname(filePath) === '.css') {
			type = 'link';
			attr = 'rel="stylesheet" type="text/css"';
			link = 'href';
			url = url.replace(/\/\.\./g, '');
		}

		return [ '<',
			type,
			' ',
			attr,
			' ',
			link,
			'="',
			url,
			'"></',
			type,
			'>'
		].join('');
	}
}

export default new Babel();