(function app () {
	'use strict';
		
	var callback = {
			stateChangeError : function (event, toState, toParams, fromState, fromParams, error) {
				console.error(error);
			},
			updateRoute : function (root, sitemap) {
				var route = [];

				function currentRoute (current) {
					if (current.parent && !current.root) {
						currentRoute(current.parent);
					}

					if (!current.route && current.root) {
						return;
					}

					if (current.route) {
						route.push(current.route.split('(')[0]);
					}
				}

				function whenUpdateRoute () {
					route = [];

					currentRoute(sitemap.current());
					
					root.status.route = route.join('.');
				}

				return whenUpdateRoute;
			},
			init : function (root, sitemap) {
				function whenInit () {
					
				}

				return whenInit;
			}
		},
		dependency = [
			'ngAnimate',
			'ngRoute',
			'ngResource',
			'ngSanitize',
			'ui.router',

			'factory',
			'service',
			'view',
			'component',

			'api'
		],
		constant = {
			'resource' : '/data/resource.json',
			'index' : 'home'
		},
		config = [
			'$locationProvider',
			'$urlRouterProvider',
			'index',
			function configScope (locationProvider, urlRouterProvider, index, sitemap) {
				locationProvider.hashPrefix('!');
				urlRouterProvider.otherwise(index);
			}
		],
		run = [
			'$rootScope', '$timeout', 'index', 'sitemap',
			function run (root, timeout, index, sitemap) {
				var updateRoute = callback.updateRoute(root, sitemap);

				root.status = {
					route : index
				};

				root.$on('sitemap.current.updated', updateRoute);
				root.$on('$stateChangeSuccess', updateRoute);
				root.$on('$stateChangeError', callback.stateChangeError);

				timeout(callback.init(root, sitemap), 0);
			}
		];

	angular
		.module('kicl', dependency)
		.constant('resource', constant.resource)
		.constant('index', constant.index)
		.config(config)
		.run(run);
}());
