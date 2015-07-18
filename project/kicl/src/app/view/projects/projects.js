(function projects () {
	'use strict';

	var ref = {},
		state = {
			name: 'projects',
			url: '/projects',
			resolve : {
				resource: ['async', 'viewProjectsResource', function resource (async, viewProjectsResource) {
					if (ref.resource) {
						return ref.resource;
					}

					ref.resource = async({ url : viewProjectsResource }).get().$promise;

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
			'$scope',
			'resource',
			'sitemap',
			function controller (scope, resource, sitemap) {
				scope.name = resource.name;
				scope.content = resource.content;
				
				sitemap.current('projects', 'root');

				capture(scope, sitemap);
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
				sitemap.add('projects', {name: 'projects', route: 'projects()'});
			}
		],
		capture = function (scope, sitemap) {
			scope.$on('behance.projects.data', callback.data(sitemap));
		},
		callback = {
			eachProject : function (sitemap) {
				function eachProject (project) {
					sitemap.add(project.id, {name: project.name, route: 'projects.project({project:"' + project.id + '"})'}, 'projects');
				}

				return eachProject;
			},
			data : function (sitemap) {
				function data (event, projects) {
					_.each(projects, callback.eachProject(sitemap));
				}

				return data;
			}
		};

	angular
		.module('view.projects', [
			'view.projects.project'
		])
		.constant('viewProjectsResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.projects.controller', controller);
}());
