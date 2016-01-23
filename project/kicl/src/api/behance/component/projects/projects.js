(function projects () {
	'use strict';

	var projectsRoute,
		controller = [
			'$rootScope', '$scope', '$stateParams', 'behanceReference', 'behanceCheck', 'behanceModify',
			function controller (root, scope, stateParams, reference, check, modify) {
				function setCurrent (project) {
					scope.current = project;

					root.$broadcast('behance.projects.set.current', scope.current);
				}

				function unsetCurrent (project) {
					delete scope.current;

					root.$broadcast('behance.projects.unset.current', scope.current);
				}

				function setControl (event, control) {
					scope.control.mouseover = control.mouseover;
					scope.control.mouseleave = control.mouseleave;
				}

				function stateChangeSuccess (event, toState, toParams, fromState, fromParams) {
					var current = _.findWhere(scope.projects, { id : toParams.project });

					if (current) {
						setCurrent(current);
						return;
					}

					if (scope.current && !current) {
						unsetCurrent(scope.current);
					}
				}

				function destroy () {
					unsetCurrent(scope.current);
				}

				function init (data) {
					reference.component.projects.resolved = data.$resolved;

					modify.storage('project', { projectsRoute : scope.attr.projectsRoute });

					scope.projects = check.project(_.map(data.projects, modify.project));
					scope.resource = reference.resource.data.widget.projects;

					setCurrent(_.findWhere(scope.projects, { id : stateParams.project }));

					root.$broadcast('behance.projects.data', scope.projects);
				}

				scope.projects = {};
				scope.resource = {};
				scope.current = {};
				scope.control = {};

				scope.$on('behance.projects.control', setControl);
				scope.$on('$stateChangeSuccess', stateChangeSuccess);
				scope.$on('$destroy', destroy);

				if (!reference.component.projects.promise) {
					reference.component.projects.promise = reference.api.projects().$promise;
				}
				
				reference.component.projects.promise.then(init);
			}
		],

		link = function (scope, elm, attr) {
			if (!attr.projectsRoute) {
				throw ('behance.component.projects need data-project-route to run');
			}

			scope.attr = attr;
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
