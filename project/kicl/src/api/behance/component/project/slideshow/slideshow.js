(function project () {
	'use strict';

	angular
		.module('behance.component.project.slideshow', [])
		.service('behance.component.project.slideshow.resource', [
			'behanceReference',
			function slideshowResource (reference) {
				var scope;

				this.data = function (resource) {
					scope.resource = resource.data.widget.project.widget.slideshow;
				};

				this.init = function (scopeRef) {
					scope = scopeRef;

					reference.resource.loader.then(this.data);
				};
			}
		])
		.service('behance.component.project.slideshow.event', [
			'$rootScope',
			'$window',
			function slideshowEvent (root, _win) {
				var scope,
					win = angular.element(_win);

				function keyup (event) {
					if (event.keyCode !== 27) {
						return;
					}

					scope.close();

					if (!scope.$$phase) {
						scope.$apply();
					}
				}

				this.data = function (event, project) {
					scope.name = project.name;
					scope.modules = project.modules;
					scope.current = project.modules[0];
				};

				this.show = function (event, params) {
					if (params.module) {
						this.setCurrent(params.module);
					}

					scope.show = true;

					win.bind('keyup', keyup);

					root.$broadcast('behance.project.slideshow.on.show');
				}.bind(this);

				this.hide = function () {
					scope.show = false;

					win.unbind('keyup', keyup);

					root.$broadcast('behance.project.slideshow.on.hide');
				};

				this.setCurrent = function (module) {
					scope.current = _.findWhere(scope.modules, module) || scope.modules[0];
					scope.currentIndex = _.findIndex(scope.modules, scope.current);

					root.$broadcast('behance.project.slideshow.setCurrent', scope.currentIndex);
				};

				this.setCurrentByIndex = function (event, index) {
					scope.current = scope.modules[index];
					scope.currentIndex = index;

					if (!scope.$$phase) {
						scope.$apply();
					}
				};

				this.init = function (scopeRef) {
					scope = scopeRef;

					scope.show = false;
					scope.setCurrent = this.setCurrent;
					scope.close = this.hide;

					scope.$on('behance.project.slideshow.data', this.data);
					scope.$on('behance.project.slideshow.show', this.show);
					scope.$on('behance.project.slideshow.hide', this.hide);
					scope.$on('behance.project.slideshow.currentIndex', this.setCurrentByIndex);

					scope.$on('$stateChangeStart', this.hide);
				};
			}
		])
		.controller('behance.component.project.slideshow.controller', [
			'$scope',
			'behance.component.project.slideshow.resource',
			'behance.component.project.slideshow.event',
			function (scope, slideshowResource, slideshowEvent) {
				slideshowResource.init(scope);
				slideshowEvent.init(scope);
			}
		])
		.directive('behanceProjectSlideshow', [
			function directive (async) {
				return {
					restrict: 'E',
					replace: true,
					scope : {
						'isolate' : '&'
					},
					templateUrl : 'api/behance/component/project/slideshow/slideshow.html',
					controller : 'behance.component.project.slideshow.controller'
				};
			}
		]);
}());