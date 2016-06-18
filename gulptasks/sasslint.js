'use strict';

import gulpSCSSLint from 'gulp-scss-lint';
import gulpSCSSLintStylish from 'gulp-scss-lint-stylish';
import gulpSCSSLintStylish2 from 'gulp-scss-lint-stylish2';

const reporter = gulpSCSSLintStylish2({ errorsOnly: true });

const config = {
	config: './scsslint.yml',
	customReport: reporter.issues,
	filePipeOutput: 'scssReport.json'
}

class Lint {
	constructor () {
		
	}

	lint () {
		return gulpSCSSLint(config);
	}

	reporter () {
		return reporter.printSummary;
	}
}

export default new Lint();