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
		.service('kicl.globalHeader.height', [
			'$rootScope',
			function (root) {
				this.update = function (event, height) {
					root.ref.globalHeader.height = height;
				};

				this.assign = function () {
					root.ref.globalHeader = {};
					root.$on('globalHeader.height', this.update);
				};
			}
		])
		.service('kicl.overlay', [
			'$rootScope',
			function (root) {
				this.set = function () {
					root.ref.overlay = true;
				};

				this.unset = function () {
					delete root.ref.overlay;
				};

				this.assign = function () {
					root.$on('overlay.set', this.set);
					root.$on('overlay.unset', this.unset);
				};
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
					root.kiclResource = timeout(whenBroadcast);
				}

				function loaded (data) {
					root.info = data.info;

					broadcastComponentData(data.component);
				}

				async({ url : 'data/resource.json' }).get().$promise.then(loaded);
			}
		])
		.run([
			'$rootScope',
			'kicl.globalHeader.height',
			'kicl.overlay',
			'kicl.resource',
			function run (root, globalHeaderHeight, overlay, resource) {
				root.ref = {};

				globalHeaderHeight.assign();
				overlay.assign();
			}
		]);
}());