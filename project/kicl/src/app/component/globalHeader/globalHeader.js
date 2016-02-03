(function globalHeader () {
	'use strict';

	var controller = [
		'$rootScope',
		'$scope',
		'$window',
		'$timeout',
		'$element',
		function (root, scope, win, timeout, element) {
			var _window = angular.element(win);

			function hide () {
				delete scope.globalHeader.status.show;
				scope.globalHeader.status.scrolled = false;
			}

			function show () {
				scope.globalHeader.status.show = true;
				scope.globalHeader.status.scrolled = false;
			}

			function showNavigation () {
				scope.globalHeader.status.navigation.show = true;
			}

			function hideNavigation () {
				delete scope.globalHeader.status.navigation.show;
			}

			function troggleNavigation (event, status) {
				if (status === 'close') {
					hideNavigation();

					return;
				}

				showNavigation();
			}

			function getHeight () {
				return element.outerHeight();
			}

			function broadcastHeight (height) {
				root.$broadcast('globalHeader.height', height);
			}

			function stateChangeSuccess () {
				hideNavigation();

				init();
			}

			function init () {
				_window.bind('scroll', onScroll);
			}

			function troggleScrollStatus () {
				if (angular.element(document).scrollTop() >= element.outerHeight()) {
					return true;
				}

				return false;
			}

			function onScroll (event) {
				scope.globalHeader.status.scrolled = troggleScrollStatus();

				if (!scope.$$phase) {
					scope.$apply();
				}
			}

			scope.globalHeader = {};

			scope.globalHeader.timer ={};
			
			scope.globalHeader.status = {};
			scope.globalHeader.status.show = false;
			scope.globalHeader.status.navigation = {};
			scope.globalHeader.status.navigation.show = true;

			timeout.cancel(scope.globalHeader.timer.init);
			scope.globalHeader.timer.init = timeout(init, 0);

			scope.$on('globalHeader.hide', hide);
			scope.$on('globalHeader.show', show);
			scope.$on('globalHeader.navigation.show', showNavigation);
			scope.$on('globalHeader.navigation.hide', hideNavigation);
			scope.$on('globalHeader.navigation.hamburgerButton.troggle', troggleNavigation);

			scope.$on('$stateChangeSuccess', stateChangeSuccess);

			scope.$watch(getHeight, broadcastHeight);
		}
	];

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/globalHeader/globalHeader.html',
			controller : controller
		};
	}

	angular.module('component.globalHeader', [])
		.directive('globalHeader', [
			directive
		]);
}());