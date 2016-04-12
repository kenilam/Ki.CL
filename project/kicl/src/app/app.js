(function app () {
	'use strict';

	var dependencies = [
		'ngAnimate',
		'ngAria',
		'ngRoute',
		'ngResource',
		'ngSanitize',
		'ui.router',

		'api',
		
		'factory',
		'service',
		'component',
		'view'
	];

	angular
		.module('kicl', dependencies)
		.service('kicl.overlay', [
			'$rootScope',
			function (root) {
				function set () {
					root.overlay = true;
				}

				function unset () {
					delete root.overlay;
				}

				root.$on('overlay.set', set);
				root.$on('overlay.unset', unset);
			}
		])
		.service('kicl.resource', [
			'$rootScope',
			'$timeout',
			'async',
			function (root, timeout, async) {
				function broadcastComponentData (componentData) {
					function eachComponent (name) {
						root.$broadcast('kicl.component.' + name + '.resource', componentData[name]);
					}

					function whenBroadcast () {
						Object.keys(componentData).forEach(eachComponent);
					}

					timeout.cancel(root.kiclResource);
					root.kiclResource = timeout(whenBroadcast, 100);
				}

				function loaded (data) {
					root.info = data.info;

					broadcastComponentData(data.component);
				}

				async({ url : 'data/resource.json' }).get().$promise.then(loaded);
			}
		])
		.run([
			'kicl.overlay',
			'kicl.resource',
			function run () {
				
			}
		]);
}());