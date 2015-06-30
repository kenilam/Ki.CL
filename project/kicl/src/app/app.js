(function () {
	'use strict';

	var callback = {
			stateChangeSuccess : function (root, sitemap) {
				function whenStateChangeStart (event, toState, toParams, fromState, fromParams) {
					root.status.route = sitemap.current().route;
				};

				return whenStateChangeStart;
			},
			stateChangeError : function (event, toState, toParams, fromState, fromParams, error) {
				console.error(error);
			},
			init : function (root, sitemap) {
				var stateChangeSuccess = callback.stateChangeSuccess(root, sitemap),
					stateChangeError = callback.stateChangeError;

				function whenInit () {
					stateChangeSuccess();

					root.$on('$stateChangeSuccess', stateChangeSuccess);
					root.$on('$stateChangeError', callback.stateChangeError);
				};

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
				root.status = {
					route : index
				};

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
