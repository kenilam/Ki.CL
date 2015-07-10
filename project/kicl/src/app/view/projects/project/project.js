(function project() {
	'use strict';

	var ref = {},
		state = {
			name: 'projects.project',
			url: '/:project',
			resolve : {
				resource: ['async', 'viewProjectsProjectResource', function resource (async, viewProjectsProjectResource) {
					if (ref.resource) {
						return ref.resource;
					}

					ref.resource = async({ url : viewProjectsProjectResource }).get().$promise;

					return ref.resource;
				}]
			},
			views: {
				'project' : {
					templateUrl : 'app/view/projects/project/project.html',
					controller : 'view.projects.project.controller'
				}
			}
		},
		constant = {
			resource : 'app/view/projects/project/project.json'
		},
		controller = [
			'$scope',
			'$stateParams',
			'$timeout',
			'behanceReference',
			'resource',
			'sitemap',
			function controller (scope, stateParams, timeout, reference, resource, sitemap) {
				function whenTimeout () {
					reference.component.project[scope.projectId].promise.then(whenProjectLoaded);
				}

				function whenProjectLoaded () {
					sitemap.current(scope.projectId, 'projects');
					scope.$emit('updateRoute');
				}

				scope.name = resource.name;
				scope.content = resource.content;

				scope.projectId = stateParams.project;

				capture(scope, sitemap);

				timeout(whenTimeout, 0);
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
				sitemap.add('projects', {name: 'projects', route: 'projects'});
			}
		];
		
	angular
		.module('view.projects.project', [])
		.constant('viewProjectsProjectResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.projects.project.controller', controller);
}());
