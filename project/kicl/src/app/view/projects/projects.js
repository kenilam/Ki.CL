(function () {
	'use strict';

	var ref = {},
		state = {
			name: 'projects',
			url: '/projects',
			resolve : {
				resource: ['async', 'viewProjectsResource', function (async, viewHomeResource) {
					if (ref.resource) {
						return ref.resource;
					}

					ref.resource = async({ url : viewHomeResource }).get().$promise;

					return ref.resource;
				}]
			},
			views: {
				'section' : {
					templateUrl: 'app/view/projects/projects.html',
					controller: 'view.projects.controller'
				}
			}
		},
		constant = {
			resource : 'app/view/projects/projects.json'
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
				sitemap.add('projects', {name: 'projects', route: 'projects'});
				sitemap.current('projects', 'root');
			}
		];

	angular
		.module('view.projects', ['ui.router'])
		.constant('viewProjectsResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.projects.controller', controller);
}());
