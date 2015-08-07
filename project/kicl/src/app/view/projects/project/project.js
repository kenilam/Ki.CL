
(function project() {
	'use strict';

	var ref = {},
		state = {
			name: 'projects.project',
			url: '/:project',
			resolve : {
				resource: ['async', 'viewProjectsProjectResource', function resource (async, viewProjectsProjectResource) {
					if (!ref.resource) {
						ref.resource = async({ url : viewProjectsProjectResource }).get().$promise;
					}

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
				var callback = {
						data : function (event, project) {
							scope.$broadcast('behance.project.throbber.hide');
							
							sitemap.current(project.id, 'projects');
						}
					};

				scope.name = resource.name;
				scope.content = resource.content;

				scope.$on('behance.project.data', callback.data);
			}
		],
		config = [
			'$stateProvider',
			function config (stateProvider) {
				stateProvider.state(state);
			}
		],
		run = [
			'$timeout',
			'$stateParams',
			'sitemap',
			function run (timeout, stateParams, sitemap) {
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
