(function projects () {
	'use strict';

	var projectsRoute,
		controller = [
			'$rootScope', '$scope', '$timeout', '$stateParams', 'behanceReference', 'behanceCheck', 'behanceModify',
			function controller (root, scope, timeout, stateParams, reference, check, modify) {
				var control = {
						set : {
							current : function (project) {
								scope.current = project;

								root.$broadcast('behance.projects.set.current', scope.current);
							}
						},
						unset : {
							current : function (project) {
								delete scope.current;

								root.$broadcast('behance.projects.unset.current', scope.current);
							}
						},
						mouseover : function () {},
						mouseleave : function () {}
					},
					callback = {
						data : function (data) {
							reference.component.projects.resolved = data.$resolved;

							modify.storage('project', { projectsRoute : scope.attr.projectsRoute });

							scope.projects = check.project(_.map(data.projects, modify.project));
							scope.resource = reference.resource.data.widget.projects;

							control.set.current(_.findWhere(scope.projects, { id : stateParams.project }));

							root.$broadcast('behance.projects.data', scope.projects);
						},
						control : function (event, control) {
							scope.control.mouseover = control.mouseover;
							scope.control.mouseleave = control.mouseleave;
						},
						destroy : function () {
							control.unset.current(scope.current);
						},
						stateChange : function (event, toState, toParams, fromState, fromParams) {
							var current = _.findWhere(scope.projects, { id : toParams.project });

							if (current) {
								control.set.current(current);
								return;
							}

							if (scope.current && !current) {
								control.unset.current(scope.current);
							}
						}
					};

				if (!reference.component.projects.promise) {
					reference.component.projects.promise = reference.api.projects().$promise;
				}

				scope.projects = {};
				scope.timer = {};
				scope.resource = {};
				scope.current = {};
				scope.control = {};
				scope.control.mouseover = control.mouseover;
				scope.control.mouseleave = control.mouseleave;
				scope.control.click = control.click;

				scope.$on('behance.projects.control', callback.control);
				scope.$on('$destroy', callback.destroy);
				scope.$on('$stateChangeSuccess', callback.stateChange);
				
				reference.component.projects.promise.then(callback.data);
				control.set.current(stateParams.project);
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
