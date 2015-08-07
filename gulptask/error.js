'use strict'

module.exports.error = function (error) {
	var logger = require('logger').createLogger(),
		colors = require('colors');
	
	console.log('');
	logger.error();
	console.log((error.plugin + ': ' + error.name).underline.bold.red);
	console.log('Reason'.yellow);
	console.log(error.message.yellow);

	// This will end the corrent process
	//this.emit('end');
} 