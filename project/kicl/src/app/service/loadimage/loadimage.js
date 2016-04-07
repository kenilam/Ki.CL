(function loadimage () {
	'use strict';

	angular.module('service.loadimage', [])
		.service('loadimage', [
			'$resource',
			function async (resource) {
				function load (url) {
					function get (resolve, reject) {
						var img = new Image();

						img.onload = function onload () {
							resolve(url);
						};

						img.onerror = function onerror () {
							reject(url);
						};

						img.src = url;
					}

					return new Promise(get);
				}

				return load;
			}
		]);
}());
