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
		
		if (path.extname(filePath) === '.css') {
			type = 'link';
			attr = 'rel="stylesheet" type="text/css"';
			link = 'href';
		}

		return [ '<',
			type,
			' ',
			attr,
			' ',
			link,
			'="',
			filePath.replace('/project/dev/', ''),
			'"></',
			type,
			'>'
		].join('');
	}
}

export default new Babel();