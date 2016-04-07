(function projects () {
	'use strict';

	var dependencies = [],

		ref = {};

	angular
		.module('view.projects.project', dependencies)
		.config(['$stateProvider',
			function config (stateProvider) {
				stateProvider.state({
					'name' : 'projects.project',
					'url' : '/:project',
					'resolve' : {
						'resource' : ['async', function resource (async) {
							if (!ref.resource) {
								ref.resource = async({ url : 'app/view/projects/project/project.json' }).get().$promise;
							}

							return ref.resource;
						}]
					},
					'views' : {
						'project' : {
							'templateUrl' : 'app/view/projects/project/project.html',
							'controller' : 'view.projects.project.controller'
						}
					}
				});
			}
		])
		.run([
			'sitemap',
			function run (sitemap) {
				
			}
		])
		.service('view.projects.project.current', [
			'$rootScope',
			'$window',
			'$timeout',
			'$stateParams',
			function current (root, _window, timeout, stateParams) {
				var scope;

				this.set = function (stateParams) {
					scope.$emit('view.project.set.current', stateParams.project);
				};

				this.unset = function (event, fromState, toState) {
					scope.$emit('view.project.unset.current');
				};

				this.stateChangeStart = function (event, toState, toParams, fromState, fromParams) {
					if (toState.name.indexOf('projects') > -1) {
						this.set(toParams);

						return;
					}

					timeout.cancel(scope.projectCurrentTimer);
					scope.projectCurrentTimer = timeout(this.unset, 500);
				}.bind(this);

				this.assign = function (scopeRef) {
					scope = scopeRef;

					this.set(stateParams);

					root.$on('$stateChangeStart', this.stateChangeStart);
				};
			}
		])
		.service('view.projects.project.slideshow', [
			function () {
				var scope;
				
				this.show = function () {
					scope.$emit('overlay.set');
				};

				this.hide = function () {
					scope.$emit('overlay.unset');
				};
				
				this.assign = function (scopeRef) {
					scope = scopeRef;

					scope.$on('behance.project.slideshow.on.show', this.show);
					scope.$on('behance.project.slideshow.on.hide', this.hide);
				};
			}
		])
		.service('view.projects.project.data', [
			'$timeout',
			function projectData (timeout) {
				var scope,
					resource;

				this.loaded = function (event, project) {
					timeout.cancel(scope.projectDataTimer);
					scope.projectDataTimer = timeout(function () {
						scope.projectLoaded = true;
						scope.$broadcast('view.projects.project.throbber.hide');
					}, 1000);

					scope.$emit('update.view.data', {
						name : 'projects.' + resource.name,
						route : resource.route.replace('.project', '.' + project.name)
					});
				};

				this.assign = function (scopeRef, resourceRef) {
					scope = scopeRef;
					resource = resourceRef;

					scope.$on('behance.project.data', this.loaded);
				};
			}
		])
		.controller('view.projects.project.controller', [
			'$scope',
			'$stateParams',
			'$anchorScroll',
			'resource',
			'view.projects.project.current',
			'view.projects.project.data',
			'view.projects.project.slideshow',
			function controller (scope, stateParams, anchorScroll, resource, currentProject, projectData, projectSlideshow) {
				currentProject.assign(scope);
				projectData.assign(scope, resource);
				projectSlideshow.assign(scope);

				anchorScroll();
			}
		]);
}());