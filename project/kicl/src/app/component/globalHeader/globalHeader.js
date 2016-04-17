(function globalHeader () {
	'use strict';

	var dependencies = [
		
	];

	angular
		.module('component.globalHeader', dependencies)
		.service('component.globalHeader.render', [
			'$rootScope',
			'$timeout',
			function render (root, timeout) {
				var scope;

				function toggle (show) {
					function whenToggle () {
						scope.show = Boolean(show);
					}

					return whenToggle;
				}

				this.hide = function () {
					timeout.cancel(scope.globalHeaderRender);
					scope.globalHeaderRender = timeout(toggle(false), 0);
				};

				this.show = function () {
					timeout.cancel(scope.globalHeaderRender);
					scope.globalHeaderRender = timeout(toggle(true), 0);
				};

				this.assign = function (scopeRef) {
					scope = scopeRef;

					scope.$on('globalHeader.show', this.show);
					scope.$on('globalHeader.hide', this.hide);

					return this;
				};
			}
		])
		.service('component.globalHeader.navigation', [
			'$window',
			'$timeout',
			'mediaquery',
			function navigation (_window, timeout, mediaquery) {
				var scope,
					element,
					emitFrom = 'globalHeader.navigation.',
					win = angular.element(_window);

				function troggle (set) {
					scope.navigation.closed = Boolean(set);

					if (!mediaquery().mobile) {
						return;
					}

					scope.$emit('overlay.' + (!Boolean(set) ? 'set' : 'unset'));
				}

				this.open = function (event) {
					troggle(false);
				};

				this.close = function (event) {
					if (event.target && event.target.parentElement.classList.contains('navigation')) {
						return;
					}

					if (event.target && event.target.parentElement.classList.contains('globalHeader')) {
						scope.$broadcast('globalHeader.navigation.hamburgerButton.open', { doNotBroadcast : true });
					}

					troggle(true);
				};

				this.resize = function () {
					if (mediaquery().mobile && !scope.navigation.closed) {
						scope.$emit('overlay.set');

						return;
					}

					scope.$emit('overlay.unset');
				};

				this.assign = function (scopeRef, elementRef) {
					scope = scopeRef;
					element = elementRef;

					scope.close = this.close;

					scope.navigation = {};

					scope.$on(emitFrom + 'hamburgerButton.render.close', this.open);
					scope.$on(emitFrom + 'hamburgerButton.render.open', this.close);

					win.bind('resize', this.resize);
				};
			}
		])
		.service('component.globalHeader.scroll', [
			'$window',
			'scroll',
			function scroll (_window, scrollEvent) {
				var scope;

				this.set = function (offset) {
					scope.scrollTop = offset.y;

					scope.scrolled = false;

					if (offset.y !== 0) {
						scope.scrolled = true;
					}

					if (!scope.$$phase) {
						scope.$apply();
					}
				}.bind(this);

				this.unbind = scrollEvent.unbind;

				this.assign = function (scopeRef) {
					scope = scopeRef;

					scrollEvent.init(this.set);
				};
			}
		])
		.service('component.globalHeader.stateChange', [
			'component.globalHeader.navigation',
			'mediaquery',
			function (navigation, mediaquery) {
				var scope;

				this.start = function () {
					if (!mediaquery().mobile) {
						return;
					}

					scope.$broadcast('globalHeader.navigation.hamburgerButton.open', { doNotBroadcast : true });
				};

				this.assign = function (scopeRef, elementRef) {
					scope = scopeRef;

					navigation.assign(scope, elementRef);

					scope.$on('$stateChangeStart', this.start);
				};
			}
		])
		.service('component.globalHeader.event', [
			'component.globalHeader.scroll',
			'component.globalHeader.stateChange',
			function globalHeaderEvent (scroll, stateChange) {
				this.assign = function (scope, element) {
					scroll.assign(scope);
					stateChange.assign(scope, element);
				};
			}
		])
		.directive('globalHeader', [
			function directive (height, scroll) {
				return {
					restrict : 'E',
					replace : true,
					transclude: true,
					scope: true,
					templateUrl : 'app/component/globalHeader/globalHeader.html',
					controller : 'component.globalHeader.controller'
				};
			}
		])
		.controller('component.globalHeader.controller',
			[
				'$scope',
				'$element',
				'component.globalHeader.render',
				'component.globalHeader.event',
				function controller (scope, element, render, globalHeaderEvent) {
					render.assign(scope);
					globalHeaderEvent.assign(scope, element);

					scope.$on('$destroy', function () {
						scroll.unbind();
					});
				}
			]
		);
}());

