(function () {
	'use strict';

	var ref = {},
		state = {
			name: 'about',
			url: '/about',
			resolve : {
				resource: ['async', 'viewAboutResource', function (async, viewAboutResource) {
					if (ref.resource) {
						return ref.resource;
					}

					ref.resource = async({ url : viewAboutResource }).get().$promise;

					return ref.resource;
				}]
			},
			views: {
				'section' : {
					templateUrl: 'app/view/about/about.html',
					controller: 'view.about.controller'
				}
			}
		},
		constant = {
			resource : 'app/view/about/about.json'
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
			'$rootScope', '$timeout', 'sitemap',
			function (root, timeout, sitemap) {
				sitemap.add('about', {name: 'about', route: 'about'});
				sitemap.current('about', 'root');
			}
		];

	angular
		.module('view.about', ['ui.router'])
		.constant('viewAboutResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.about.controller', controller);
}());
