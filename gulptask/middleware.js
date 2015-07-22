'use strict'

module.exports.middleware = function (project) {
	var fs = require('fs'),
		url = require("url");

	function read (exceptionExpression, dirName, req, res, next) {
		var uri = url.parse(req.url, true),
			rootPath = appRoot + '/project/' + project + '/' + dirName,
			filePath = rootPath + uri.pathname,

			baseUrl = new RegExp('%7B%7BbaseUrl%7D%7D', 'g'),
			version = new RegExp('%7B%7Bversion%7D%7D', 'g'),
			userName = new RegExp('%7B%7BuserName%7D%7D', 'g');

		if (!uri.pathname.match(exceptionExpression)) {
			return next();
		}

		fs.readFile(
			filePath
				.replace(baseUrl, 'api/behance')
				.replace(version, 'v2')
				.replace(userName, 'kicl'),
			{encoding: 'utf-8', flag: 'rs'}, function(error, data) {
				if (error) return res.end(error.toString().replace(rootPath, ''));

				if (uri.query.callback) {
					return res.end('/**/' + uri.query.callback + '(' + data + ')');
				}

				res.end(data);
			}
		);
	}

	function mock (req, res, next) {
		read(/\.json$/, 'mock', req, res, next);
	}

	return {
		mock : mock
	}
}