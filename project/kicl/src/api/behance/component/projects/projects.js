(function projects () {
	'use strict';

	angular
		.module('behance.component.projects', [])
		.service('behance.component.projects.currentProject', [
			'$stateParams',
			'behance.component.projects.current',
			'behance.component.projects.currentIndex',
			function currentProject (stateParams, current, currentIndex) {
				var scope;

				this.set = function (project, navigate) {
					var currentProject = project || _.findWhere(scope.projects, { id : stateParams.project });

					if (currentProject) {
						current.set(currentProject);
						currentIndex.set();

						if (!navigate) {
							return;
						}

						state.go('projects.project', { project : currentProject.id });

						return;
					}

					if (scope.current) {
						current.unset();
						currentIndex.unset();
					}
				};

				this.assign = function (scopeRef) {
					scope = scopeRef;

					current.assign(scope);
					currentIndex.assign(scope);
				};
			}
		])
		.service('behance.component.projects.currentIndex', [
			'$rootScope',
			'$timeout',
			function currentIndex (root, timeout) {
				var scope;

				this.broadcast = function (method) {
					if (!method) {
						return;
					}

					timeout.cancel(scope.currentIndexTimer);
					scope.currentIndexTimer = timeout(function () {
						root.$broadcast('behance.projects.set.' + method + '.currentIndex', scope.currentIndex);
					}, 0);
				};

				this.set = function (prop) {
					scope.currentIndex = scope.projects.map(function eachProject (prop, index) {
						if (scope.current.id === prop.id) {
							return index;
						}
					}).filter(function filterProjects (index) {
						return index >= 0;
					})[0];

					this.broadcast('set');
				};

				this.unset = function () {
					delete scope.currentIndex;

					this.broadcast('unset');
				};

				this.assign = function (scopeRef) {
					scope = scopeRef;
				};
			}
		])
		.service('behance.component.projects.current', [
			'$rootScope',
			'$timeout',
			'behance.component.projects.currentIndex',
			function current (root, timeout, currentIndex) {
				var scope;

				this.broadcast = function (method) {
					if (!method) {
						return;
					}

					timeout.cancel(scope.currentTimer);
					scope.currentTimer = timeout(function () {
						root.$broadcast('behance.projects.set.' + method + '.current', scope.current);
					}, 0);
				};

				this.set = function (project) {
					scope.current = project || scope.projects[0];

					this.broadcast('set');
				};

				this.unset = function () {
					delete scope.current;

					currentIndex.unset();

					this.broadcast('unset');
				};

				this.assign = function (scopeRef) {
					scope = scopeRef;

					currentIndex.assign(scope);
				};
			}
		])
		.service('behance.component.projects.data', [
			'$rootScope',

			'behanceReference',
			'behanceCheck',
			'behanceModify',

			'behance.component.projects.current',
			'behance.component.projects.currentIndex',
			'behance.component.projects.currentProject',
			function projectsData (root, reference, check, modify, current, currentIndex, currentProject) {
				var scope,
					attrs;

				this.set = function (projects) {
					scope.projects = check.project(_.map(projects, modify.project));
					
					current.set();
					currentIndex.set();
					currentProject.set();
				};

				this.loaded = function (data) {
					reference.component.projects.resolved = data.$resolved;

					modify.storage('project', { projectsRoute : attrs.projectsRoute });

					this.set(data.projects);

					root.$broadcast('behance.projects.data', scope.projects);
				}.bind(this);

				this.assign = function (scopeRef, attrsRef) {
					if (!attrsRef.projectsRoute) {
						throw ('behance.component.projects need data-project-route to run');
					}

					scope = scopeRef;
					attrs = attrsRef;

					scope.resource = reference.resource.data.widget.projects;
					scope.projectsUseBackground = scope.$eval(attrs.projectsUseBackground);

					if (!reference.component.projects.promise) {
						reference.component.projects.promise = reference.api.projects().$promise;
					}
					
					reference.component.projects.promise.then(this.loaded);

					current.assign(scope);
					currentIndex.assign(scope);
					currentProject.assign(scope);
				};
			}
		])
		.service('behance.component.projects.stateChange', [
			'behance.component.projects.current',
			'behance.component.projects.currentProject',
			function stateChange (current, currentProject) {
				var scope;

				this.onStateChangeSuccess = function (event, toState, toParams, fromState, fromParams) {
					if (!scope) {
						return;
					}

					if (toState.name === 'projects.project') {
						currentProject.set();

						return;
					}

					current.unset();
				};

				this.assign = function (scopeRef) {
					scope = scopeRef;

					scope.$on('$stateChangeSuccess', this.onStateChangeSuccess);
				};
			}
		])
		.controller('behance.component.projects.controller', [
			'$scope',
			'$attrs',
			'behance.component.projects.data',
			'behance.component.projects.stateChange',
			function controller (scope, attrs, projectsData, stateChange) {
				projectsData.assign(scope, attrs);
				stateChange.assign(scope);
			}
		])
		.directive('behanceProjects', [
			function directive (async) {
				return {
					restrict: 'E',
					replace: true,
					scope : {
						'isolate' : '&'
					},
					templateUrl : 'api/behance/component/projects/projects.html',
					controller : 'behance.component.projects.controller'
				};
			}
		]);
}());
