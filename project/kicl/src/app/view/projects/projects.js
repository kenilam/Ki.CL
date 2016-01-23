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
					templateUrl : 'app/view/projects/projects.html',
					controller : 'view.projects.controller'
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
			'mediaquery',
			'behanceReference',
			function controller (root, scope, element, timeout, resource, sitemap, mediaquery, behanceReference) {
				var set = {
						sitemap : function () {
							function setProject (project, index) {
								sitemap.add(
									project.id,
									{
										name: project.name,
										route: 'projects.project({project:"' + project.id + '"})'
									},
									'projects'
								);
							}

							return setProject;
						}
					},
					control = {
						mouse : {
							over : function (project) {
								
							},
							leave : function (project) {
								
							}
						},
						current : {
							set : function (event, current) {
								scope.current = current;
							},
							unset : function () {
								delete scope.current;
							}
						},
						destroy : function () {
							scope.$emit('backdrop.remove');

							function eachTimer (timer, name) {
								timeout.cancel(timer);
							}

							_.each(scope.timer, eachTimer);
						}
					};

				function init (event, projects) {
					function ready () {
						_.each(projects, set.sitemap());
						
						scope.$broadcast('behance.projects.throbber.hide');
						scope.$broadcast('behance.projects.control', {
							mouseover : control.mouse.over,
							mouseleave : control.mouse.leave
						});
					}

					timeout.cancel(scope.timer.ready);
					scope.timer.ready = timeout(ready, 0);
				}

				scope.name = resource.name;
				scope.content = resource.content;

				scope.timer = {};
				scope.control = {};
				scope.control.mouseover = control.mouseover;
				scope.control.mouseleave = control.mouseleave;

				scope.$on('behance.projects.data', init);
				scope.$on('behance.projects.set.current', control.current.set);
				scope.$on('behance.projects.unset.current', control.current.unset);
				scope.$on('$destroy', control.destroy);

				root.$broadcast('globalHeader.show');

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
