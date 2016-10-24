'use strict';

import path from 'path';

import gulp from 'gulp';

class Babel {
	constructor () {
		return this.transform.bind(this);
	}

	transform (filePath) {
		let type = 'script';
		let link = 'src';
		
		if (path.extname(filePath) === '.css') {
			type = 'style';
			link = 'href';
		}

		console.log(filePath.replace('/project/dev', ''));
		console.log('');

		return [ '<',
			type,
			' type="babel/text" ',
			link,
			'="',
			filePath.replace('/project/dev', ''),
			'"></',
			type,
			'>'
		].join('');
	}
}

export default new Babel();