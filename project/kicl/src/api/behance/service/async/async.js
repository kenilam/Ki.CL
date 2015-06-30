(function () {
	'use strict';

	var service = [
		'$resource',
		function service (resource) {
			return function trigger (url, api_key) {
				return function assign (arg) {
					if (!arg) {
						arg = {};
					}

					if (!arg.params) {
						arg.params = {};
					}
					arg.params.api_key = api_key;
					arg.params.callback = 'JSON_CALLBACK';

					return resource(
						url + '/' + (arg.path ? arg.path: ''),
						arg.credent,
						{
							'post':     {params : arg.params, method:'POST'},
							'put':      {params : arg.params, method:'PUT'},
							'jsonp':    {params : arg.params, method:'JSONP'}
						}
					);
				};
			};
		}
	];

	angular.module('behance.service.async', [])
		.service('behanceAsync', service);
}());
