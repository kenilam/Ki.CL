(function projects () {
	'use strict';

	var projectsRoute,
		controller = [
			'$rootScope', '$scope', '$stateParams', '$timeout', 'behanceReference', 'behanceCheck', 'behanceModify',
			function controller (root, scope, stateParams, timeout, reference, check, modify) {
				function setCurrentIndex () {
					function broadcast () {
						root.$broadcast('behance.projects.set.currentIndex', scope.currentIndex);
					}

					function eachProject (prop, index) {
						if (scope.current.id === prop.id) {
							return index;
						}
					}
					
					function filterProjects (index) {
						return index >= 0;
					}

					scope.currentIndex = scope.projects.map(eachProject).filter(filterProjects)[0];

					timeout.cancel(scope.timer.setCurrentIndex);
					scope.timer.setCurrentIndex = timeout(broadcast, 0);
				}
				function unsetCurrentIndex () {
					function broadcast () {
						root.$broadcast('behance.projects.unset.currentIndex', scope.currentIndex);
					}

					delete scope.currentIndex;

					timeout.cancel(scope.timer.unsetCurrentIndex);
					scope.timer.unsetCurrentIndex = timeout(broadcast, 0);
				}
				

				function setCurrent (project) {
					function broadcast () {
						root.$broadcast('behance.projects.set.current', scope.current);
					}

					scope.current = project || scope.projects[0];

					timeout.cancel(scope.timer.setCurrent);
					scope.timer.setCurrent = timeout(broadcast, 0);
				}

				function unsetCurrent () {
					function broadcast () {
						root.$broadcast('behance.projects.unset.current', scope.current);
					}

					delete scope.current;

					unsetCurrentIndex();

					timeout.cancel(scope.timer.setCurrent);
					scope.timer.setCurrent = timeout(broadcast, 0);
				}

				function setCurrentProject () {
					var current = _.findWhere(scope.projects, { id : stateParams.project });
					
					if (current) {
						setCurrent(current);
						setCurrentIndex();

						return;
					}

					if (scope.current && !current) {
						unsetCurrent();
						unsetCurrentIndex();
					}
				}

				function setControl (event, control) {
					scope.control.click = control.click;
				}

				function stateChangeSuccess (event, toState, toParams, fromState, fromParams) {
					setCurrentProject();
				}

				function destroy () {
					unsetCurrent();

					_.each(scope.timer, function (timer) {
						timeout.cancel(timer);
					});
				}

				function init (data) {
					var current;

					reference.component.projects.resolved = data.$resolved;

					modify.storage('project', { projectsRoute : scope.attr.projectsRoute });

					scope.projects = check.project(_.map(data.projects, modify.project));
					scope.resource = reference.resource.data.widget.projects;

					setCurrentProject();

					root.$broadcast('behance.projects.data', scope.projects);
				}

				scope.projects = {};
				scope.timer = {};
				scope.resource = {};
				scope.current = {};
				scope.currentIndex = 0;
				scope.control = {};
				scope.control.click = function () { return; };

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
