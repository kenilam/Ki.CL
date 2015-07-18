(function about () {
	'use strict';

	var ref = {},
		state = {
			name: 'about',
			url: '/about',
			resolve : {
				resource: ['async', 'viewAboutResource', function resource (async, viewAboutResource) {
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
			'$scope',
			'resource',
			'sitemap',
			function controller (scope, resource, sitemap) {
				scope.name = resource.name;
				scope.content = resource.content;
				
				sitemap.current('about', 'root');
			}
		],
		config = [
			'$stateProvider',
			function config (stateProvider) {
				stateProvider.state(state);
			}
		],
		run = [
			'sitemap',
			function run (sitemap) {
				sitemap.add('about', {name: 'about', route: 'about()'});
			}
		];

	angular
		.module('view.about', [])
		.constant('viewAboutResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.about.controller', controller);
}());
