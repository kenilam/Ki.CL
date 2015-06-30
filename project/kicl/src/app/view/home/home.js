(function () {
	'use strict';

	var ref = {},
		state = {
			name: 'home',
			url: '/home',
			resolve : {
				resource: ['async', 'viewHomeResource', function (async, viewHomeResource) {
					if (ref.resource) {
						return ref.resource;
					}

					ref.resource = async({ url : viewHomeResource }).get().$promise;

					return ref.resource;
				}]
			},
			views: {
				'section' : {
					templateUrl: 'app/view/home/home.html',
					controller: 'view.home.controller'
				}
			}
		},
		constant = {
			resource : 'app/view/home/home.json'
		},
		controller = [
			'$rootScope',
			'$scope',
			'resource',
			'sitemap',
			function controller (root, scope, resource, sitemap) {
				scope.content = resource.content;
			}
		],
		config = [
			'$stateProvider',
			function config (stateProvider) {
				stateProvider.state(state);
			}
		],
		run = [
			'$rootScope',
			'sitemap',
			function (root, sitemap) {
				sitemap.add('home', {name: 'home', route: 'home'});
				sitemap.current('home', 'root');
			}
		];

	angular
		.module('view.home', ['ui.router'])
		.constant('viewHomeResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.home.controller', controller);
}());
