(function cursor () {
	'use strict';

	angular
		.module('component.cursor', [])
		.service('component.cursor.position', [
			function () {
				var scope,
					element;

				this.move = function (prop) {
					if (!scope || !prop || prop.x === undefined || prop.y === undefined) {
						return;
					}

					TweenMax.set(element, prop);
				};

				this.assign = function (scopeRef, elementRef) {
					scope = scopeRef;
					element = elementRef;
				};
			}
		])
		.service('component.cursor.event', [
			'$window',
			'checkmobilebrowser',
			'component.cursor.position',
			function (_win, checkmobilebrowser, position) {
				var scope,
					element,
					win = angular.element(_win);

				this.bind = function () {
					if (checkmobilebrowser()) {
						win.onmousemove = null;

						return;
					}

					win.bind('mousemove', this.move);
				}.bind(this);

				this.resize = function () {
					this.bind();
				}.bind(this);

				this.move = function (event) {
					position.move({
						x : event.pageX + element.parent().scrollLeft(),
						y : event.pageY + element.parent().scrollTop()
					});
				};

				this.assign = function (scopeRef, elementRef) {
					scope = scopeRef;
					element = elementRef;

					position.assign(scope, element);
					
					win.bind('resize', this.resize);
				};
			}
		])
		.service('component.cursor.resource', [
			function resource () {
				var scope,
					attrs;

				function hasResource (event, resource) {
					scope.resource = resource;
				}

				this.assign = function (scopeRef, attrsRef) {
					scope = scopeRef;
					attrs = attrsRef;
				};
			}
		])
		.directive('cursor', [
			function directive () {
				return {
					restrict: 'E',
					replace: true,
					scope : {
						'isolate' : '&'
					},
					templateUrl : 'app/component/cursor/cursor.html',
					controller : 'component.cursor.controller'
				};
			}
		])
		.controller('component.cursor.controller', [
			'$scope',
			'$element',
			'$attrs',
			'component.cursor.event',
			'component.cursor.resource',
			function controller (scope, element, attrs, event, resource) {
				event.assign(scope, element);
				resource.assign(scope, attrs);
			}
		]);
}());
