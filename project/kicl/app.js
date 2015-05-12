var root = __dirname + '/../../',

	appName = 'Ki.CL',
	port    =  '8081',
	debug   = false,
	logger  = require('logger').createLogger(),
	express = require('express'),
	http    = require('http'),

	app     = express(),
	server  = http.createServer(app),
	environment = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";

if(!environment) {
	environment = "build"
}

/**** **** **** **** ****/
/* Express setting */
app.use(express.static(__dirname + '/' + environment));
app.use(function(req, res, next) {
	return next();
});
/**** **** **** **** ****/

server.listen(port, function(){
	console.log('');
	console.log('=== ==== ==== ==== ');
	logger.info();
	console.log(appName, 'listening at port:', port);
	console.log('=== ==== ==== ==== ');
});
/**** End of Script ****/
