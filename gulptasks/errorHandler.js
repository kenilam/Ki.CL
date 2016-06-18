'use strict';

import gulpNotify from 'gulp-notify';
import gulpPlumber from 'gulp-plumber';

class Handler {
	constructor () {
		
	}

	notify () {
		return gulpNotify.onError({
			title: '',
			message: [
				'\n',
				'\n',
				'<%= error.message %>'
			].join(' ')
		})
	}

	plumber () {
		return gulpPlumber({
			errorHandler: this.notify()
		});
	}
}

export default new Handler();