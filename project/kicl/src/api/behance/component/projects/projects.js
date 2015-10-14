(function projects () {
	'use strict';

	var projectsRoute,
		controller = [
			'$rootScope', '$scope', '$stateParams', 'behanceReference', 'behanceCheck', 'behanceModify',
			function controller (root, scope, stateParams, reference, check, modify) {
				var control = {
						set : {
							current : {
								id : function (id) {
									scope.current.id = id;
								}
							}
						}
					},
					callback = {
						data : function (data) {
							reference.component.projects.resolved = data.$resolved;

							modify.storage('project', { projectsRoute : projectsRoute });

							scope.projects = check.project(_.map(data.projects, modify.project));
							scope.resource = reference.resource.data.widget.projects;

							root.$broadcast('behance.projects.data', scope.projects);
						},
						stateChange : function (event, toState, toParams, fromState, fromParams) {
							control.set.current.id(toParams.project);
						}
					};

				if (!reference.component.projects.promise) {
					reference.component.projects.promise = reference.api.projects().$promise;
				}

				scope.projects = {};
				scope.resource = {};
				scope.current = {};

				scope.$on('$stateChangeSuccess', callback.stateChange);
				
				reference.component.projects.promise.then(callback.data);
				control.set.current.id(stateParams.project);
			}
		],

		link = function (scope, elm, attr) {
			if (!attr.projectsRoute) {
				throw ('behance.component.projects need data-project-route to run');
			}

			projectsRoute = attr.projectsRoute;
		};

	function directive (async) {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'api/behance/component/projects/projects.html',
			controller : controller,
			link : link
		};
	}

	angular.module('behance.component.projects', [])
		.directive('behanceProjects', [
			directive
		]);
}());
