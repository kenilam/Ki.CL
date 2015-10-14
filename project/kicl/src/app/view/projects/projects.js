(function projects () {
	'use strict';

	var ref = {},
		state = {
			name: 'projects',
			url: '/projects',
			resolve : {
				resource: ['async', 'viewProjectsResource', function resource (async, viewProjectsResource) {
					if (!ref.resource) {
						ref.resource = async({ url : viewProjectsResource }).get().$promise;
					}

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
			'$element',
			'$timeout',
			'resource',
			'sitemap',
			function controller (root, scope, element, timeout, resource, sitemap) {
				var get = {
						list : function () {
							return element.find('[data-api="behance.projects"] li');
						}
					},
					callback = {
						data : function (event, projects) {
							function hasData () {
								_.each(
									projects,
									eachProject()
								);
								
								scope.$broadcast('behance.projects.throbber.hide');
							}

							timeout.cancel(scope.timer.data);
							scope.timer.data = timeout(hasData, 0);
						}
					};

				function eachProject () {
					var projects = element.find('[data-api="behance.projects"] li'),
						isHidden = 'isHidden',
						pendding = 400,
						speed = 1600;

					function showProject (list) {
						function whenShow () {
							list.removeClass(isHidden);
						}

						return whenShow;
					}

					function setProject (project, index) {
						sitemap.add(
							project.id,
							{
								name: project.name,
								route: 'projects.project({project:"' + project.id + '"})'
							},
							'projects'
						);

						timeout.cancel(scope.timer.render[index]);
						scope.timer.render[index] = timeout(
							showProject(
								angular.element(projects.get(index)).addClass(isHidden)
							),
							pendding + (speed / projects.length * index));
					}

					return setProject;
				}

				scope.name = resource.name;
				scope.content = resource.content;
				scope.timer = {};
				scope.timer.render = {};
				
				scope.$on('behance.projects.data', callback.data);

				sitemap.current('projects', 'root');
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
		];

	angular
		.module('view.projects', [
			'view.projects.project'
		])
		.constant('viewProjectsResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.projects.controller', controller);
}());
