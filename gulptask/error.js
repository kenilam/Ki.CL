'use strict'

module.exports.error = function (error) {
	var logger = require('logger').createLogger();

	console.log('');
	console.log('==== ==== ====');
	logger.info();
	console.log(error.plugin, error.name);
	console.log('Reason: ', error.message);
	console.log('==== ==== ====');
	console.log('');

	this.emit('end');
} 